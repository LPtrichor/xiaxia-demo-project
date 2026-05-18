import dayjs from 'dayjs'

/** 日期格式化为 YYYY-MM-DD */
export function formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format)
}

/** 日期格式化为 YYYY-MM-DD HH:mm */
export function formatDateTime(date: string | Date): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

/** 相对时间描述（如"3天前"） */
export function formatRelative(date: string | Date): string {
  const now = dayjs()
  const target = dayjs(date)
  const diffDays = now.diff(target, 'day')

  if (diffDays === 0) return '今天'
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) return `${diffDays}天前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`
  return `${Math.floor(diffDays / 365)}年前`
}

/** 数字格式化（千分位） */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN')
}

/** 浏览量简写（如 1.2k） */
export function formatViewCount(count: number): string {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}万`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}
