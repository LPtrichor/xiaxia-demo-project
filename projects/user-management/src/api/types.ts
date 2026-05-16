// 所有类型定义

export type UserRole = 'admin' | 'user' | 'readonly';
export type UserStatus = 'active' | 'disabled';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface OperationLog {
  id: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'toggleStatus';
  detail: string;
  timestamp: string;
}

export interface UserQuery {
  keyword?: string;
  role?: UserRole | '';
  status?: UserStatus | '';
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// UserService 接口契约
export interface IUserService {
  list(query: UserQuery): Promise<PaginatedResult<User>>;
  get(id: string): Promise<User | null>;
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  remove(id: string): Promise<void>;
  toggleStatus(id: string): Promise<User>;
  resetSeed(): Promise<User[]>;
}

// LogService 接口契约
export interface ILogService {
  list(): Promise<OperationLog[]>;
  record(
    userId: string,
    userName: string,
    action: OperationLog['action'],
    detail: string
  ): Promise<OperationLog>;
  clear(): Promise<void>;
}
