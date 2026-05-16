// 用户列表状态管理 composable
import { ref, reactive } from 'vue';
import type { User, UserQuery } from '@/api/types';
import { userService } from '@/api/userService';

export function useUserList() {
  const users = ref<User[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const query = reactive<UserQuery>({
    keyword: '',
    role: '',
    status: '',
    page: 1,
    pageSize: 10,
  });

  async function fetchList() {
    loading.value = true;
    try {
      const result = await userService.list({ ...query });
      users.value = result.items;
      total.value = result.total;
    } finally {
      loading.value = false;
    }
  }

  function handleSearch() {
    query.page = 1;
    fetchList();
  }

  function handlePageChange(page: number) {
    query.page = page;
    fetchList();
  }

  function handleSizeChange(size: number) {
    query.pageSize = size;
    query.page = 1;
    fetchList();
  }

  function resetQuery() {
    query.keyword = '';
    query.role = '';
    query.status = '';
    query.page = 1;
    query.pageSize = 10;
    fetchList();
  }

  return {
    users,
    total,
    loading,
    query,
    fetchList,
    handleSearch,
    handlePageChange,
    handleSizeChange,
    resetQuery,
  };
}
