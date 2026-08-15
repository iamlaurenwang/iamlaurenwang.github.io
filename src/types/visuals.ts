export interface Tool {
  slug: string
  title: string
  description: string
  tags: string[]
  thumbnail?: string
}

/**
 * One base64-encoded audio clip. Mirrors the shape returned by the TTS API —
 * only `audio` is used for conversion, the rest is metadata carried along.
 */
export interface Base64AudioItem {
  id?: string
  /** Base64 audio content, with or without a `data:audio/...;base64,` prefix. */
  audio: string
  filename?: string
  text?: string
  voiceType?: string
  voiceName?: string
  style?: string
  wpm?: number
  locale?: string
  instructions?: string
}

export interface Work {
  title: string
  description: string
  thumbnail: string
  tags: string[]
  link?: string
}
