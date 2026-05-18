/** 用户角色 */
export type UserRole = 'admin' | 'editor' | 'viewer'

/** 用户状态 */
export type UserStatus = 'active' | 'disabled'

/** 用户 */
export interface User {
  id: string
  username: string
  password?: string
  realName?: string
  role: UserRole
  department?: string
  phone?: string
  email?: string
  avatar?: string
  status: UserStatus
  createdAt: string
  lastLoginAt?: string
}

/** 登录请求 */
export interface LoginRequest {
  username: string
  password: string
  captcha: string
}

/** 登录响应 */
export interface LoginResponse {
  token: string
  user: User
  expiresIn: number
}
