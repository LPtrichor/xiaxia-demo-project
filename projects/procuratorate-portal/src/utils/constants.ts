/** localStorage key 前缀 */
export const STORAGE_KEY_PREFIX = 'proc_portal_'

/** 存储 key 常量 */
export const STORAGE_KEYS = {
  ARTICLES: 'articles',
  CATEGORIES: 'categories',
  USERS: 'users',
  CONFIG: 'config',
  AUTH_TOKEN: 'auth_token',
  CURRENT_USER: 'current_user',
  INIT_DONE: 'init_done',
} as const

/** 角色常量 */
export const ROLE = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const

/** 用户状态常量 */
export const USER_STATUS = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const

/** 文章状态常量 */
export const ARTICLE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

/** 默认分页大小 */
export const DEFAULT_PAGE_SIZE = 10
