<template>
  <div class="module-list-view page-container">
    <PortalBreadcrumb :category="category" />

    <div class="page-header">
      <h2 class="page-title">{{ title }}</h2>
      <p class="page-desc">共 {{ result.total }} 篇文章</p>
    </div>

    <div class="content-area">
      <div class="content-header">
        <SearchBar placeholder="按标题关键词搜索" @search="handleSearch" />
      </div>

      <div class="article-list">
        <ArticleCard v-for="item in result.items" :key="item.id" :article="item" />
      </div>

      <el-empty v-if="result.items.length === 0" description="暂无文章" />

      <div class="pagination-wrapper">
        <PaginationBar
          v-if="result.totalPages > 1"
          :current="currentPage"
          :page-size="pageSize"
          :total="result.total"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PortalBreadcrumb from '@/components/layout/PortalBreadcrumb.vue'
import ArticleCard from '@/components/article/ArticleCard.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import PaginationBar from '@/components/common/PaginationBar.vue'
import { queryArticles } from '@/composables/useMockData'
import type { CategoryCode } from '@/types'

const props = defineProps<{
  category: CategoryCode
  title: string
}>()

const currentPage = ref(1)
const keyword = ref('')
const pageSize = 8

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
  padding: $spacing-xl 0 $spacing-xxxl;
}

.page-header {
  margin-bottom: $spacing-xl;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $accent-color;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: $accent-color;
  }
}

.page-title {
  font-size: $font-size-xxl;
  font-weight: 700;
  color: $primary-color;
  margin: 0;
  display: inline-block;
}

.page-desc {
  font-size: $font-size-sm;
  color: $text-muted;
  margin: $spacing-sm 0 0;
}

.content-area {
  background: $bg-white;
  border-radius: $card-radius;
  padding: $spacing-xl;
  box-shadow: $shadow-sm;
  border: 1px solid $border-light;
}

.content-header {
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-light;
}

.article-list {
  display: flex;
  flex-direction: column;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: $spacing-xl;
  padding-top: $spacing-lg;
  border-top: 1px solid $border-light;
}
</style>
