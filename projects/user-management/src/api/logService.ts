// 操作日志 CRUD 接口
import type { OperationLog, ILogService } from './types';
import { getLogs, setLogs } from './storage';

class LocalStorageLogService implements ILogService {
  async list(): Promise<OperationLog[]> {
    const logs = getLogs();
    return logs
      .map((l) => ({ ...l }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async record(
    userId: string,
    userName: string,
    action: OperationLog['action'],
    detail: string
  ): Promise<OperationLog> {
    const logs = getLogs();
    const log: OperationLog = {
      id: this._uuid(),
      userId,
      userName,
      action,
      detail,
      timestamp: new Date().toISOString(),
    };
    logs.push(log);
    setLogs(logs);
    return { ...log };
  }

  async clear(): Promise<void> {
    setLogs([]);
  }

  private _uuid(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

export const logService = new LocalStorageLogService();
