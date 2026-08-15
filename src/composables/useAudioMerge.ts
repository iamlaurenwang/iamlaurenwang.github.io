import { ref } from 'vue'
import { Mp3Encoder } from '@breezystack/lamejs'
import type { Base64AudioItem } from '@/types/visuals'

/** Samples per MP3 frame — lamejs expects blocks of this size. */
const BLOCK_SIZE = 1152

/** Default output bitrate, matching the Node CLI version of this tool. */
const DEFAULT_KBPS = 128

/** Share of the progress bar spent decoding; the rest is encoding. */
const DECODE_SHARE = 0.7

/** Removes a `data:audio/mp3;base64,` style prefix if one is present. */
export function stripBase64Prefix(base64: string): string {
  return base64.replace(/^data:audio\/[a-z0-9.+-]+;base64,/i, '')
}

/**
 * Decodes a base64 string into a fresh ArrayBuffer.
 *
 * Always returns a new buffer because `decodeAudioData` detaches whatever it is
 * given — a shared buffer would be unusable on the second read.
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(stripBase64Prefix(base64).trim())
  const buffer = new ArrayBuffer(binary.length)
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return buffer
}

/** Wraps base64 audio as a playable/downloadable Blob without re-encoding it. */
export function base64ToMp3Blob(base64: string): Blob {
  return new Blob([base64ToArrayBuffer(base64)], { type: 'audio/mpeg' })
}

/** Triggers a browser download for a Blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  // Revoke on the next tick — revoking synchronously can cancel the download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Builds a safe `.mp3` filename for an item, falling back to its position. */
export function itemFilename(item: Base64AudioItem, index: number): string {
  const base = (item.id ?? item.filename ?? `audio_${index + 1}`).replace(
    /\.mp3$/i,
    '',
  )
  return `${base.replace(/[^\w.-]+/g, '_')}.mp3`
}

/** Downmixes an AudioBuffer to a single channel of PCM samples. */
function toMono(buffer: AudioBuffer): Float32Array {
  const channelCount = buffer.numberOfChannels
  if (channelCount === 1) return buffer.getChannelData(0)

  const mixed = new Float32Array(buffer.length)
  for (let channel = 0; channel < channelCount; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < mixed.length; i++) {
      mixed[i] = (mixed[i] ?? 0) + (data[i] ?? 0)
    }
  }
  for (let i = 0; i < mixed.length; i++) {
    mixed[i] = (mixed[i] ?? 0) / channelCount
  }
  return mixed
}

/** Encodes mono float samples into an MP3 Blob. */
function encodeMp3(
  samples: Float32Array,
  sampleRate: number,
  kbps: number,
): Blob {
  const pcm = new Int16Array(samples.length)
  for (let i = 0; i < samples.length; i++) {
    const sample = Math.max(-1, Math.min(1, samples[i] ?? 0))
    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff
  }

  const encoder = new Mp3Encoder(1, sampleRate, kbps)
  // lamejs types its output as Uint8Array<ArrayBufferLike>, but it is always
  // backed by a plain ArrayBuffer — which is what Blob requires.
  const chunks: BlobPart[] = []
  for (let offset = 0; offset < pcm.length; offset += BLOCK_SIZE) {
    const encoded = encoder.encodeBuffer(
      pcm.subarray(offset, offset + BLOCK_SIZE),
    )
    if (encoded.length > 0) chunks.push(encoded as BlobPart)
  }
  const tail = encoder.flush()
  if (tail.length > 0) chunks.push(tail as BlobPart)

  return new Blob(chunks, { type: 'audio/mpeg' })
}

/**
 * Merges base64 audio clips into a single MP3, entirely in the browser.
 *
 * Each clip is decoded to PCM first, which resamples everything to one common
 * sample rate — that is what makes clips with mismatched bitrates, sample rates
 * or channel counts safe to join. The joined PCM is then re-encoded with lamejs.
 */
export function useAudioMerge() {
  const isMerging = ref(false)
  const progress = ref(0)
  const error = ref<string | null>(null)

  async function mergeToMp3(
    items: Base64AudioItem[],
    kbps: number = DEFAULT_KBPS,
  ): Promise<Blob | null> {
    if (items.length === 0) {
      error.value = 'Add at least one clip before merging.'
      return null
    }

    isMerging.value = true
    progress.value = 0
    error.value = null

    const context = new AudioContext()
    try {
      // 1. Decode every clip to mono PCM at the context's sample rate.
      const parts: Float32Array[] = []
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (!item) continue
        try {
          const decoded = await context.decodeAudioData(
            base64ToArrayBuffer(item.audio),
          )
          parts.push(toMono(decoded))
        } catch {
          throw new Error(
            `Clip ${i + 1}${item.id ? ` (${item.id})` : ''} is not valid audio.`,
          )
        }
        progress.value = Math.round(
          ((i + 1) / items.length) * DECODE_SHARE * 100,
        )
      }

      // 2. Join the PCM end to end, in array order.
      const totalLength = parts.reduce((sum, part) => sum + part.length, 0)
      const joined = new Float32Array(totalLength)
      let offset = 0
      for (const part of parts) {
        joined.set(part, offset)
        offset += part.length
      }

      // 3. Re-encode the whole thing as one MP3.
      const blob = encodeMp3(joined, context.sampleRate, kbps)
      progress.value = 100
      return blob
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      return null
    } finally {
      await context.close()
      isMerging.value = false
    }
  }

  return { isMerging, progress, error, mergeToMp3 }
}
