<template>
  <div class="module-list-view page-container">
    <PortalBreadcrumb :category="category" />

    <h2 class="page-title">{{ title }}</h2>

    <div class="content-area">
      <SearchBar placeholder="按标题关键词搜索" @search="handleSearch" />

      <div class="article-list">
        <ArticleCard v-for="item in result.items" :key="item.id" :article="item" />
      </div>

      <el-empty v-if="result.items.length === 0" description="暂无文章" />

      <PaginationBar
        v-if="result.totalPages > 1"
        :current="currentPage"
        :page-size="pageSize"
        :total="result.total"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PortalBreadcrumb from '@/components/layout/PortalBreadcrumb.vue'
import ArticleCard from '@/components/article/ArticleCard.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import PaginationBar from '@/components/common/PaginationBar.vue'
import { useMockData } from '@/composables/useMockData'
import type { CategoryCode } from '@/types'

const props = defineProps<{
  category: CategoryCode
  title: string
}>()

const { queryArticles } = useMockData()

const currentPage = ref(1)
const keyword = ref('')
const pageSize = 5

const result = computed(() =>
  queryArticles({
    category: props.category,
    keyword: keyword.value,
    page: currentPage.value,
    pageSize,
  })
)

function handleSearch(kw: string) {
  keyword.value = kw
  currentPage.value = 1
}

function handlePageChange(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.module-list-view {
  max-width: 960px;
  margin: 0 auto;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: 700;
  color: $primary-color;
  padding-bottom: $spacing-sm;
  margin-bottom: $spacing-md;
  border-bottom: 2px solid $accent-color;
  display: inline-block;
}

.content-area {
  background: $bg-white;
  border-radius: $card-radius;
  padding: $spacing-lg;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.article-list {
  margin-top: $spacing-md;
}
</style>
