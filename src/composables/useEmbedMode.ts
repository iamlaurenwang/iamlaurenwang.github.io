import { ref } from 'vue'
import type { LocationQuery } from 'vue-router'

/**
 * 精簡模式（embed）：帶 `?embed=1` 進站後隱藏 header 部分進入點。
 * 一旦偵測到即黏著整個瀏覽 session（sessionStorage），站內導頁不會失效。
 */
const STORAGE_KEY = 'embed-mode'

const isEmbed = ref(sessionStorage.getItem(STORAGE_KEY) === '1')

/** 依當前路由 query 偵測是否進入精簡模式；只會開啟、不會關閉。 */
function detectEmbed(query: LocationQuery): void {
  if (query.embed === '1' && !isEmbed.value) {
    isEmbed.value = true
    sessionStorage.setItem(STORAGE_KEY, '1')
  }
}

export function useEmbedMode() {
  return { isEmbed, detectEmbed }
}
