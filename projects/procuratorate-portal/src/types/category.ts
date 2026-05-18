/** 栏目代码 */
export type CategoryCode =
  | 'leader-speech'
  | 'dept-dynamic'
  | 'training'
  | 'file-download'
  | 'regulation'
  | 'party-building'
  | 'study-garden'
  | 'resource-share'

/** 栏目配置 */
export interface Category {
  code: CategoryCode
  name: string
  icon?: string
  description?: string
  order: number
  visible: boolean
  routePath: string
}
