// 种子数据初始化
import { ref } from 'vue';
import { getUsers } from '@/api/storage';
import { userService } from '@/api/userService';

const seeded = ref(false);

export async function ensureSeedData(): Promise<void> {
  if (seeded.value) return;
  const existing = getUsers();
  if (existing.length === 0) {
    await userService.resetSeed();
  }
  seeded.value = true;
}
