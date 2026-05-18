/** 快捷入口 */
export interface QuickNavItem {
  id: string
  label: string
  icon: string
  routePath: string
  color?: string
}

/** 飘窗配置 */
export interface FloatingWindowConfig {
  title: string
  content: string
  imageUrl?: string
  linkUrl?: string
  position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  closeable: boolean
  autoClose?: number
}

/** 公告 */
export interface Announcement {
  title: string
  content: string
  type: 'info' | 'warning' | 'urgent'
  startTime?: string
  endTime?: string
}

/** 底部信息 */
export interface FooterInfo {
  copyright: string
  icpNumber: string
  gonganNumber: string
  address: string
  phone: string
  email: string
}

/** 门户配置 */
export interface PortalConfig {
  siteTitle: string
  siteSubtitle: string
  logoUrl: string
  bannerImages: string[]
  announcement: Announcement[]
  quickNavItems: QuickNavItem[]
  floatingWindow?: FloatingWindowConfig
  footerInfo: FooterInfo
}
