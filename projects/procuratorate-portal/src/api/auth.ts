import { mockRequest, mockError } from './request'
import { getStorage, setStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/utils/constants'
import type { User, LoginRequest, LoginResponse } from '@/types'

/** 登录 */
export function login(req: LoginRequest): Promise<LoginResponse> {
  const users = (getStorage<(User & { password?: string })[]>(STORAGE_KEYS.USERS, []) ?? [])
  const user = users.find(
    (u) => u.username === req.username && u.password === req.password
  )

  if (!user) {
    return mockError('用户名或密码错误')
  }

  if (user.status === 'disabled') {
    return mockError('账号已被禁用')
  }

  // 更新最后登录时间
  const now = new Date().toISOString()
  user.lastLoginAt = now
  setStorage(STORAGE_KEYS.USERS, users)

  // 保存认证信息
  const token = `mock_token_${user.id}_${Date.now()}`
  setStorage(STORAGE_KEYS.AUTH_TOKEN, token)
  // 存储时排除密码字段
  const { password: _pwd, ...safeUser } = user
  setStorage(STORAGE_KEYS.CURRENT_USER, safeUser)

  return mockRequest<LoginResponse>({
    token,
    user: safeUser as User,
    expiresIn: 7200,
  })
}

/** 登出 */
export function logout(): Promise<void> {
  setStorage(STORAGE_KEYS.AUTH_TOKEN, null)
  setStorage(STORAGE_KEYS.CURRENT_USER, null)
  return mockRequest<void>(undefined)
}

/** 获取当前登录用户 */
export function getCurrentUser(): Promise<User | null> {
  const user = getStorage<User>(STORAGE_KEYS.CURRENT_USER, null)
  return mockRequest<User | null>(user)
}

/** 获取认证 token */
export function getAuthToken(): string | null {
  return getStorage<string>(STORAGE_KEYS.AUTH_TOKEN, null)
}
