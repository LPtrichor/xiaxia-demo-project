import type { CategoryCode } from './category'

/** 文章状态 */
export type ArticleStatus = 'draft' | 'published' | 'archived'

/** 附件 */
export interface Attachment {
  id: string
  name: string
  url: string
  size: string
  type: string
}

/** 文章 */
export interface Article {
  id: string
  title: string
  subtitle?: string
  summary?: string
  content: string
  coverImage?: string
  category: CategoryCode
  author?: string
  source?: string
  publishDate: string
  updateTime?: string
  viewCount: number
  attachments?: Attachment[]
  isTop: boolean
  status: ArticleStatus
}

/** 文章列表查询参数 */
export interface ArticleQuery {
  category?: CategoryCode
  keyword?: string
  page: number
  pageSize: number
  sortBy?: 'publishDate' | 'viewCount'
}

/** 分页响应 */
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
