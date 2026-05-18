import {
  STORAGE_KEY_PREFIX,
  STORAGE_KEYS,
} from '@/utils/constants'

/** 从 localStorage 读取数据 */
export function getStorage<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const value = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
    if (value === null) return defaultValue
    return JSON.parse(value) as T
  } catch {
    return defaultValue
  }
}

/** 将数据写入 localStorage */
export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value))
  } catch (e) {
    console.error(`[storage] 写入失败: ${key}`, e)
  }
}

/** setStorage 的别名 */
export function setItem<T>(key: string, value: T): void {
  setStorage(key, value)
}

/** 移除指定 key */
export function removeStorage(key: string): void {
  localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`)
}

/** 初始化种子数据（仅首次运行时执行） */
export function initSeedData(seed: Record<string, unknown>): void {
  const initialized = getStorage<boolean>(STORAGE_KEYS.INIT_DONE, false)
  if (initialized) return

  for (const [key, value] of Object.entries(seed)) {
    setStorage(key, value)
  }
  setStorage(STORAGE_KEYS.INIT_DONE, true)
  console.log('[storage] 种子数据初始化完成')
}
