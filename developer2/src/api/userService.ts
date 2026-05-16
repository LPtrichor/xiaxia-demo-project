// 用户 CRUD 接口 — localStorage 实现
import type { User, UserQuery, PaginatedResult, IUserService } from './types';
import { getUsers, setUsers, setLogs } from './storage';
import { logService } from './logService';

class LocalStorageUserService implements IUserService {
  async list(query: UserQuery): Promise<PaginatedResult<User>> {
    let users = getUsers().map((u) => ({ ...u }));

    // 模糊搜索
    if (query.keyword) {
      const kw = query.keyword.toLowerCase();
      users = users.filter(
        (u) => u.name.toLowerCase().includes(kw) || u.phone.includes(kw)
      );
    }

    // 角色筛选
    if (query.role) {
      users = users.filter((u) => u.role === query.role);
    }

    // 状态筛选
    if (query.status) {
      users = users.filter((u) => u.status === query.status);
    }

    const total = users.length;
    const start = (query.page - 1) * query.pageSize;
    const items = users.slice(start, start + query.pageSize);

    return { items, total, page: query.page, pageSize: query.pageSize };
  }

  async get(id: string): Promise<User | null> {
    const users = getUsers();
    const user = users.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const users = getUsers();
    const user: User = {
      ...data,
      id: this._uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(user);
    setUsers(users);
    await logService.record(user.id, user.name, 'create', `创建用户：${user.name}`);
    return { ...user };
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error(`用户不存在: ${id}`);
    users[idx] = { ...users[idx], ...data, updatedAt: new Date().toISOString() };
    setUsers(users);
    const updated = { ...users[idx] };
    await logService.record(updated.id, updated.name, 'update', `编辑用户：${updated.name}`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const users = getUsers();
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const name = user.name;
    setUsers(users.filter((u) => u.id !== id));
    await logService.record(id, name, 'delete', `删除用户：${name}`);
  }

  async toggleStatus(id: string): Promise<User> {
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error(`用户不存在: ${id}`);
    const newStatus = users[idx].status === 'active' ? 'disabled' : 'active';
    users[idx] = {
      ...users[idx],
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    setUsers(users);
    const updated = { ...users[idx] };
    await logService.record(
      updated.id,
      updated.name,
      'toggleStatus',
      `${newStatus === 'active' ? '启用' : '禁用'}用户：${updated.name}`
    );
    return updated;
  }

  async resetSeed(): Promise<User[]> {
    const resp = await fetch('/seed-data.json');
    const seedData: User[] = await resp.json();
    // 给种子数据补充时间
    const now = new Date().toISOString();
    const users = seedData.map((u) => ({
      ...u,
      createdAt: now,
      updatedAt: now,
    }));
    setUsers(users);
    setLogs([]);
    await logService.record('', '系统', 'create', '重置种子数据');
    return users;
  }

  private _uuid(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `usr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

export const userService = new LocalStorageUserService();
