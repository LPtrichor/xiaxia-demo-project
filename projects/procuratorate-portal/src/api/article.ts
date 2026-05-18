import { mockRequest } from './request'
import { getStorage, setStorage } from '@/utils/storage'
import { STORAGE_KEYS, DEFAULT_PAGE_SIZE } from '@/utils/constants'
import type { Article, ArticleQuery, PaginatedResult } from '@/types'

/** 获取文章列表 */
export function getArticleList(query: ArticleQuery): Promise<PaginatedResult<Article>> {
  let all = getStorage<Article[]>(STORAGE_KEYS.ARTICLES, []) ?? []

  // 过滤已发布文章
  all = all.filter((a) => a.status === 'published')

  // 按栏目筛选
  if (query.category) {
    all = all.filter((a) => a.category === query.category)
  }

  // 关键词搜索
  if (query.keyword?.trim()) {
    const kw = query.keyword.trim().toLowerCase()
    all = all.filter(
      (a) => a.title.toLowerCase().includes(kw) || (a.summary?.toLowerCase().includes(kw) ?? false)
    )
  }

  // 排序（置顶优先，然后按指定字段）
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

  return mockRequest<PaginatedResult<Article>>({
    items,
    total,
    page,
    pageSize,
    totalPages,
  })
}

/** 根据 ID 获取文章详情 */
export function getArticleById(id: string): Promise<Article | null> {
  const all = getStorage<Article[]>(STORAGE_KEYS.ARTICLES, []) ?? []
  const article = all.find((a) => a.id === id) ?? null
  return mockRequest<Article | null>(article)
}

/** 增加文章浏览量 */
export function incrementArticleViewCount(id: string): void {
  const all = getStorage<Article[]>(STORAGE_KEYS.ARTICLES, []) ?? []
  const article = all.find((a) => a.id === id)
  if (article) {
    article.viewCount += 1
    setStorage(STORAGE_KEYS.ARTICLES, all)
  }
}
