import { ref } from 'vue'
import { getArticleList, getArticleById, incrementArticleViewCount } from '@/api/article'
import type { Article, ArticleQuery, PaginatedResult } from '@/types'

/**
 * 文章操作 Composable
 */
export function useArticle() {
  const articles = ref<Article[]>([])
  const article = ref<Article | null>(null)
  const loading = ref(false)
  const total = ref(0)

  async function fetchList(query: ArticleQuery): Promise<PaginatedResult<Article>> {
    loading.value = true
    try {
      const result = await getArticleList(query)
      articles.value = result.items
      total.value = result.total
      return result
    } finally {
      loading.value = false
    }
  }

  async function fetchDetail(id: string): Promise<Article | null> {
    loading.value = true
    try {
      const result = await getArticleById(id)
      article.value = result
      return result
    } finally {
      loading.value = false
    }
  }

  function bumpViewCount(id: string): void {
    incrementArticleViewCount(id)
  }

  return {
    articles,
    article,
    loading,
    total,
    fetchList,
    fetchDetail,
    bumpViewCount,
  }
}
