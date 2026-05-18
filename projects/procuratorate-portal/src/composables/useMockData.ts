import { getStorage, setStorage, initSeedData } from '@/utils/storage'
import { STORAGE_KEYS, DEFAULT_PAGE_SIZE } from '@/utils/constants'
import type { Article, ArticleQuery, PaginatedResult, Category, User, PortalConfig, CategoryCode, QuickNavItem, FloatingWindowConfig } from '@/types'
import { ref } from 'vue'

/** 公告类型 */
export type AnnouncementType = 'info' | 'warning' | 'urgent'

/** 公告条目 */
export interface AnnouncementItem {
  id: string
  title: string
  type: AnnouncementType
  date: string
  link: string
}

/** 新闻条目 */
export interface NewsItem {
  id: string
  title: string
  summary?: string
  date: string
  category: string
  link: string
  coverImage?: string
  viewCount?: number
  imageGradient?: string
}

/** 轮播条目 */
export interface BannerSlide {
  id: string
  image: string
  gradient: string
  title: string
  subtitle?: string
}

/** 统计数据 */
export interface StatItem {
  label: string
  value: number
  suffix?: string
  color: string
}

/** 初始化种子数据到 localStorage（首次访问时执行） */
export function useMockData() {
  return {
    init: () => { initSeedData(seedData as Record<string, unknown>) },
    getCategoryName,
    getArticles,
    getCategories,
    getUsers,
    getPortalConfig,
    saveArticles,
    saveUsers,
    getArticleById,
    getAdjacentArticles,
    queryArticles,
  }
}

import seedData from '@/data/seed-data.json'

/** 读取文章列表 */
export function getArticles(): Article[] {
  return getStorage<Article[]>(STORAGE_KEYS.ARTICLES, []) ?? []
}

/** 保存文章列表 */
export function saveArticles(articles: Article[]): void {
  setStorage(STORAGE_KEYS.ARTICLES, articles)
}

/** 读取栏目列表 */
export function getCategories(): Category[] {
  return getStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []) ?? []
}

/** 读取用户列表 */
export function getUsers(): User[] {
  return getStorage<User[]>(STORAGE_KEYS.USERS, []) ?? []
}

/** 保存用户列表 */
export function saveUsers(users: User[]): void {
  setStorage(STORAGE_KEYS.USERS, users)
}

/** 读取门户配置 */
export function getPortalConfig(): PortalConfig | null {
  return getStorage<PortalConfig>(STORAGE_KEYS.CONFIG, null)
}

/** 获取栏目名称 */
export function getCategoryName(code: string): string {
  const cats = getCategories()
  const found = cats.find(c => c.code === code)
  return found?.name || code
}

/** 根据 ID 获取文章 */
export function getArticleById(id: string): Article | null {
  const articles = getArticles()
  return articles.find(a => a.id === id) ?? null
}

/** 获取上下篇文章 */
export function getAdjacentArticles(currentId: string, category: CategoryCode): { prev: Article | null; next: Article | null } {
  const articles = getArticles()
    .filter(a => a.status === 'published' && a.category === category)
    .sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())

  const idx = articles.findIndex(a => a.id === currentId)
  return {
    prev: idx > 0 ? articles[idx - 1] : null,
    next: idx >= 0 && idx < articles.length - 1 ? articles[idx + 1] : null,
  }
}

/** 分页查询文章 */
export function queryArticles(query: ArticleQuery): PaginatedResult<Article> {
  let all = getArticles()
  all = all.filter(a => a.status === 'published')

  if (query.category) {
    all = all.filter(a => a.category === query.category)
  }
  if (query.keyword?.trim()) {
    const kw = query.keyword.trim().toLowerCase()
    all = all.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      (a.summary?.toLowerCase().includes(kw) ?? false)
    )
  }

  all.sort((a, b) => {
    if (a.isTop !== b.isTop) return a.isTop ? -1 : 1
    if (query.sortBy === 'viewCount') return b.viewCount - a.viewCount
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  })

  const pageSize = query.pageSize || DEFAULT_PAGE_SIZE
  const page = query.page || 1
  const total = all.length
  const totalPages = Math.ceil(total / pageSize) || 1
  const start = (page - 1) * pageSize
  const items = all.slice(start, start + pageSize)

  return { items, total, page, pageSize, totalPages }
}

/** 公告数据 */
export function useAnnouncementData(): AnnouncementItem[] {
  const config = getPortalConfig()
  if (!config || !config.announcement) return []
  return config.announcement.map((a, i) => ({
    id: `ann-${i}`,
    title: a.title,
    type: a.type,
    date: a.startTime ? new Date(a.startTime).toLocaleDateString('zh-CN') : '',
    link: '/announcements',
  }))
}

/** 轮播图数据 */
export function useBannerData(): BannerSlide[] {
  const config = getPortalConfig()
  const images = config?.bannerImages ?? []
  const gradients = [
    'linear-gradient(135deg, rgba(26,58,92,0.8), rgba(15,36,64,0.6))',
    'linear-gradient(135deg, rgba(45,90,142,0.8), rgba(26,58,92,0.6))',
    'linear-gradient(135deg, rgba(196,30,36,0.7), rgba(26,58,92,0.5))',
  ]
  const titles = ['依法治检 公正司法', '强化监督 维护正义', '忠诚担当 司法为民']
  return images.map((img, i) => ({
    id: `banner-${i}`,
    image: img,
    gradient: gradients[i % gradients.length],
    title: titles[i % titles.length],
    subtitle: '泗洪县人民检察院',
  }))
}

/** 快捷入口数据 */
export function useQuickNavData(): QuickNavItem[] {
  const config = getPortalConfig()
  return config?.quickNavItems ?? []
}

/** 新闻数据 */
export function useNewsData(): NewsItem[] {
  const articles = getArticles()
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 10)

  return articles.map(a => ({
    id: a.id,
    title: a.title,
    summary: a.summary,
    date: new Date(a.publishDate).toLocaleDateString('zh-CN'),
    category: getCategoryName(a.category),
    link: `/article/${a.id}`,
    coverImage: a.coverImage,
    viewCount: a.viewCount,
  }))
}

/** 统计数据 */
export function useStatsData(): StatItem[] {
  return [
    { label: '文章总数', value: 128, color: '#1a3a5c' },
    { label: '本月更新', value: 23, color: '#2d5a8e' },
    { label: '访问人数', value: 15234, suffix: '+', color: '#c41e24' },
    { label: '通知公告', value: 56, color: '#4a7ab5' },
  ]
}

/** 飘窗数据 */
interface FloatingWindowState {
  config: ReturnType<typeof ref<FloatingWindowConfig & { visible: boolean; imageGradient?: string; link?: string; linkText?: string }>>
  updateConfig: (updates: Partial<FloatingWindowConfig>) => void
}

export function useMockFloatingWindow(): FloatingWindowState {
  const portalConfig = getPortalConfig()
  const fw = portalConfig?.floatingWindow
  const config = ref<FloatingWindowConfig & { visible: boolean; imageGradient?: string; link?: string; linkText?: string }>({
    title: fw?.title || '',
    content: fw?.content || '',
    imageUrl: fw?.imageUrl,
    linkUrl: fw?.linkUrl,
    position: fw?.position || 'top-right',
    closeable: fw?.closeable ?? true,
    autoClose: fw?.autoClose,
    visible: true,
    imageGradient: 'linear-gradient(135deg, #c41e24, #1a3a5c)',
    link: fw?.linkUrl,
    linkText: '点击查看详情',
  })

  function updateConfig(updates: Partial<FloatingWindowConfig>) {
    Object.assign(config.value, updates)
  }

  return { config, updateConfig }
}
