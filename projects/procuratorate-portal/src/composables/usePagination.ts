import { ref, computed, type Ref } from 'vue'
import type { PaginatedResult } from '@/types'

/**
 * 分页逻辑 Composable
 * @param fetchFn 数据获取函数
 */
export function usePagination<T>(
  fetchFn: (page: number, pageSize: number) => PaginatedResult<T>,
  pageSize = 10
) {
  const page = ref(1)
  const currentPageSize = ref(pageSize)
  const items: Ref<T[]> = ref([])
  const total = ref(0)
  const loading = ref(false)

  const totalPages = computed(() => Math.ceil(total.value / currentPageSize.value) || 1)

  async function loadPage(p: number = page.value): Promise<void> {
    loading.value = true
    try {
      const result = fetchFn(p, currentPageSize.value)
      items.value = result.items
      total.value = result.total
      page.value = p
    } finally {
      loading.value = false
    }
  }

  function setPage(p: number): void {
    if (p < 1 || p > totalPages.value) return
    void loadPage(p)
  }

  return {
    page,
    pageSize: currentPageSize,
    items,
    total,
    totalPages,
    loading,
    loadPage,
    setPage,
  }
}
