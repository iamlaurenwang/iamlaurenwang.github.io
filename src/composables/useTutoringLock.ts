import { ref } from 'vue'

/**
 * Tutoring 鎖定：從 `/tutoring` 進站（或帶 `?src=tutoring`）的訪客會被黏在家教體驗，
 * 之後任何導向 LandingView（`/`）的動作都會被 router guard 導回 `/tutoring`。
 * 一旦標記即黏著整個瀏覽 session（sessionStorage），只會開啟、不會關閉。
 */
const STORAGE_KEY = 'tutoring-origin'

const isTutoringOrigin = ref(sessionStorage.getItem(STORAGE_KEY) === '1')

/** 標記本次 session 為「從 tutoring 進來」；只會開、不會關。 */
function markTutoringOrigin(): void {
  if (isTutoringOrigin.value) return
  isTutoringOrigin.value = true
  sessionStorage.setItem(STORAGE_KEY, '1')
}

export function useTutoringLock() {
  return { isTutoringOrigin, markTutoringOrigin }
}
