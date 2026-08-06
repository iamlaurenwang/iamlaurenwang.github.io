import type { Period } from '@/types/resume'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

function fmtYM(ym: string): string {
  const [year, month] = ym.split('-')
  if (!month || !year) return ym
  return `${MONTHS[Number(month) - 1]} ${year}`
}

export function usePeriod() {
  function formatPeriod(period: Period): string {
    return `${fmtYM(period.start)} – ${period.end ? fmtYM(period.end) : 'Present'}`
  }
  return { formatPeriod }
}
