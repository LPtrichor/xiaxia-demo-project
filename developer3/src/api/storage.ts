// localStorage 读写工具封装

const STORAGE_KEY_USERS = 'user_management_users';
const STORAGE_KEY_LOGS = 'user_management_logs';

export function getUsers(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setUsers(users: any[]): void {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

export function getLogs(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setLogs(logs: any[]): void {
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
}

export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY_USERS);
  localStorage.removeItem(STORAGE_KEY_LOGS);
}
