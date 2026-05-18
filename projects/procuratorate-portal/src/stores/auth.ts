import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, logout as apiLogout, getCurrentUser as apiGetCurrentUser, getAuthToken } from '@/api/auth'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import { STORAGE_KEYS, ROLE, USER_STATUS } from '@/utils/constants'
import type { User, LoginRequest, LoginResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getAuthToken())
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isEditor = computed(() => user.value?.role === 'admin' || user.value?.role === 'editor')

  async function doLogin(req: LoginRequest): Promise<LoginResponse> {
    loading.value = true
    try {
      const result = await apiLogin(req)
      token.value = result.token
      user.value = result.user
      return result
    } finally {
      loading.value = false
    }
  }

  async function doLogout(): Promise<void> {
    await apiLogout()
    token.value = null
    user.value = null
  }

  async function initSession(): Promise<void> {
    try {
      const currentUser = await apiGetCurrentUser()
      if (currentUser) {
        user.value = currentUser
      }
    } catch {
      // 忽略
    }
  }

  return {
    token,
    user,
    loading,
    isLoggedIn,
    isAdmin,
    isEditor,
    doLogin,
    doLogout,
    initSession,
  }
})

// ========== 直接操作 localStorage 的辅助函数（供路由守卫和登录页使用） ==========

export function getToken(): string | null {
  return getStorage<string>(STORAGE_KEYS.AUTH_TOKEN, null)
}

export function setToken(token: string): void {
  setStorage(STORAGE_KEYS.AUTH_TOKEN, token)
}

export function removeToken(): void {
  removeStorage(STORAGE_KEYS.AUTH_TOKEN)
  removeStorage(STORAGE_KEYS.CURRENT_USER)
}

export function getCurrentUser(): User | null {
  return getStorage<User>(STORAGE_KEYS.CURRENT_USER, null)
}

export function setCurrentUser(user: User): void {
  setStorage(STORAGE_KEYS.CURRENT_USER, user)
}

/** 检查是否已登录且角色匹配 */
export function isAuthenticated(requiredRole?: 'admin' | 'editor'): boolean {
  const t = getToken()
  if (!t) return false
  const u = getCurrentUser()
  if (!u) return false
  if (u.status !== USER_STATUS.ACTIVE) return false
  if (requiredRole === 'admin' && u.role !== ROLE.ADMIN) return false
  if (requiredRole === 'editor' && u.role !== ROLE.ADMIN && u.role !== ROLE.EDITOR) return false
  return true
}

// ========== 重新导出（供登录页使用） ==========
export { getUsers } from '@/composables/useMockData'
