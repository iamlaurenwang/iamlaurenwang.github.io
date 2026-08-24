import type { LocationQuery } from 'vue-router'

/**
 * UTM／campaign 歸因擷取。散發連結（如 `/#/tutoring?utm_source=facebook`）進站時，
 * 從路由 query 擷取 utm_* 參數並黏著整個 session（sessionStorage），供 GA4 手動 campaign
 * 歸因使用。
 *
 * hash 路由下 utm 位於 hash 片段內，GA4 的自動歸因看不到，因此改由 useAnalytics 在
 * 每次 page_view 帶上 campaign_* 事件參數。詳見 docs/analytics.md。
 */
const STORAGE_KEY = 'attribution'

// utm query 鍵 → GA4 手動 campaign 歸因的保留事件參數名。
const UTM_TO_CAMPAIGN = {
  utm_source: 'campaign_source',
  utm_medium: 'campaign_medium',
  utm_campaign: 'campaign_name',
  utm_term: 'campaign_term',
  utm_content: 'campaign_content',
} as const

type UtmKey = keyof typeof UTM_TO_CAMPAIGN
type Attribution = Partial<Record<UtmKey, string>>

const UTM_KEYS = Object.keys(UTM_TO_CAMPAIGN) as UtmKey[]

function loadStored(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}

let attribution: Attribution = loadStored()

/**
 * 從當前路由 query 擷取 utm 參數。只會在第一次偵測到任一 utm 時寫入，
 * 避免站內導頁把已保存的來源蓋掉。
 */
function detectAttribution(query: LocationQuery): void {
  if (Object.keys(attribution).length > 0) return

  const found: Attribution = {}
  for (const key of UTM_KEYS) {
    const value = query[key]
    if (typeof value === 'string' && value !== '') {
      found[key] = value
    }
  }

  if (Object.keys(found).length === 0) return

  attribution = found
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
}

/**
 * 純函式：回傳 GA4 手動 campaign 歸因所需的事件參數（只含有值的鍵）。
 * 沒有任何 utm 時回傳空物件。供 useAnalytics 直接 import，避免循環相依。
 */
export function getCampaignParams(): Record<string, string> {
  const params: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = attribution[key]
    if (value) params[UTM_TO_CAMPAIGN[key]] = value
  }
  return params
}

export function useAttribution() {
  return { detectAttribution, getCampaignParams }
}
