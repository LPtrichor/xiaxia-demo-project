import { mockRequest } from './request'
import { getStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/utils/constants'
import type { Category, CategoryCode } from '@/types'

/** 获取所有栏目 */
export function getAllCategories(): Promise<Category[]> {
  const all = getStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []) ?? []
  const visible = all.filter((c) => c.visible).sort((a, b) => a.order - b.order)
  return mockRequest<Category[]>(visible)
}

/** 根据栏目代码获取栏目信息 */
export function getCategoryByCode(code: CategoryCode): Promise<Category | null> {
  const all = getStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []) ?? []
  const category = all.find((c) => c.code === code) ?? null
  return mockRequest<Category | null>(category)
}
