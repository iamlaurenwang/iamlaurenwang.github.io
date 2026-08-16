import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TeachingCategory, TeachingItem } from '@/types/teaching'

export interface CategoryOption {
  value: TeachingCategory | 'all'
  label: string
}

export const teachingCategories: CategoryOption[] = [
  { value: 'all', label: '全部' },
  { value: 'interactive', label: '互動練習' },
  { value: 'worksheet', label: '自編試題' },
  { value: 'project', label: '課程專案' },
  { value: 'student-work', label: '學生成果' },
]

const validValues = new Set(teachingCategories.map((c) => c.value))

/**
 * 分類篩選，狀態存在 query string（`?category=worksheet`），
 * 這樣篩選後的連結可以直接分享，重新整理也不會掉。
 */
export function useTeachingFilter(items: TeachingItem[]): {
  activeCategory: ComputedRef<TeachingCategory | 'all'>
  filteredItems: ComputedRef<TeachingItem[]>
  setCategory: (value: TeachingCategory | 'all') => void
} {
  const route = useRoute()
  const router = useRouter()

  const activeCategory = computed<TeachingCategory | 'all'>(() => {
    const raw = route.query.category
    const value = Array.isArray(raw) ? raw[0] : raw
    return typeof value === 'string' &&
      validValues.has(value as TeachingCategory)
      ? (value as TeachingCategory)
      : 'all'
  })

  const filteredItems = computed<TeachingItem[]>(() =>
    activeCategory.value === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory.value),
  )

  function setCategory(value: TeachingCategory | 'all'): void {
    const query = { ...route.query }
    if (value === 'all') delete query.category
    else query.category = value
    void router.replace({ query })
  }

  return { activeCategory, filteredItems, setCategory }
}
