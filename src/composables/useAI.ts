import { ref } from 'vue'
import { getGenerativeModel, type ModelParams } from 'firebase/ai'
import { ai, model } from '@/firebase'

/**
 * Thin wrapper around a Firebase AI Logic (Gemini) model that tracks
 * loading / error state and exposes one-shot and streaming helpers.
 *
 * @param params model config — at minimum `{ model: 'gemini-3.6-flash' }`.
 *               Pass `systemInstruction` / `generationConfig` for structured
 *               output or persona control.
 */
export function useAI(params: ModelParams) {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const model = getGenerativeModel(ai, params)

  /** Run the prompt and return the full response text. */
  async function generate(prompt: string): Promise<string> {
    isLoading.value = true
    error.value = null
    try {
      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (e) {
      console.error('[useAI] generate failed:', e)
      error.value = '目前無法連線 AI 服務，請稍後再試。'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  /** Stream the response, invoking `onChunk` with each incremental piece. */
  async function stream(prompt: string, onChunk: (text: string) => void): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const result = await model.generateContentStream(prompt)
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) onChunk(text)
      }
    } catch (e) {
      console.error('[useAI] stream failed:', e)
      error.value = '目前無法連線 AI 服務，請稍後再試。'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, error, generate, stream }
}
