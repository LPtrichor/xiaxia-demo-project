import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticleList, getArticleById } from '@/api/article'
import { getAllCategories, getCategoryByCode } from '@/api/category'
import type { Article, ArticleQuery, PaginatedResult, Category, CategoryCode } from '@/types'

export const useContentStore = defineStore('content', () => {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const total = ref(0)

  async function fetchArticles(query: ArticleQuery): Promise<PaginatedResult<Article>> {
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

  async function fetchArticleDetail(id: string): Promise<Article | null> {
    loading.value = true
    try {
      const result = await getArticleById(id)
      currentArticle.value = result ?? null
      return result ?? null
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories(): Promise<Category[]> {
    const result = await getAllCategories()
    categories.value = result
    return result
  }

  async function fetchCategory(code: CategoryCode): Promise<Category | null> {
    return getCategoryByCode(code)
  }

  return {
    articles,
    currentArticle,
    categories,
    loading,
    total,
    fetchArticles,
    fetchArticleDetail,
    fetchCategories,
    fetchCategory,
  }
})
