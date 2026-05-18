<template>
  <div class="article-detail-view page-container">
    <PortalBreadcrumb :category="article?.category" :current-label="article?.title" />

    <div v-if="article" class="article-container">
      <h1 class="article-title">{{ article.title }}</h1>
      <p v-if="article.subtitle" class="article-subtitle">{{ article.subtitle }}</p>

      <ArticleMeta :article="article" />

      <div class="divider"></div>

      <div class="article-content" v-html="article.content"></div>

      <AttachmentList :attachments="article.attachments" />

      <div class="article-nav">
        <router-link
          v-if="prevArticle"
          :to="{ name: 'article-detail', params: { id: prevArticle.id } }"
          class="nav-link prev"
        >
          <el-icon><ArrowLeft /></el-icon>
          上一篇：{{ prevArticle.title }}
        </router-link>
        <span v-else class="nav-link disabled">上一篇：无</span>

        <router-link
          v-if="nextArticle"
          :to="{ name: 'article-detail', params: { id: nextArticle.id } }"
          class="nav-link next"
        >
          下一篇：{{ nextArticle.title }}
          <el-icon><ArrowRight /></el-icon>
        </router-link>
        <span v-else class="nav-link disabled">下一篇：无</span>
      </div>
    </div>

    <el-empty v-else description="文章不存在或已被删除" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import PortalBreadcrumb from '@/components/layout/PortalBreadcrumb.vue'
import ArticleMeta from '@/components/article/ArticleMeta.vue'
import AttachmentList from '@/components/article/AttachmentList.vue'
import { useMockData } from '@/composables/useMockData'
import type { Article } from '@/types'

const route = useRoute()
const { getArticleById, getAdjacentArticles } = useMockData()

const article = ref<Article | null>(null)
const prevArticle = ref<Article | null>(null)
const nextArticle = ref<Article | null>(null)

onMounted(() => {
  const id = route.params.id as string
  article.value = getArticleById(id)
  if (article.value) {
    const adjacent = getAdjacentArticles(id, article.value.category)
    prevArticle.value = adjacent.prev
    nextArticle.value = adjacent.next
  }
})
</script>

<style lang="scss" scoped>
.article-detail-view {
  max-width: 900px;
  margin: 0 auto;
}

.article-container {
  background: $bg-white;
  border-radius: $card-radius;
  padding: $spacing-xl;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.article-title {
  font-size: $font-size-xxl;
  font-weight: 700;
  color: $text-primary;
  text-align: center;
  line-height: 1.4;
  margin: 0 0 $spacing-xs;
}

.article-subtitle {
  font-size: $font-size-lg;
  color: $text-secondary;
  text-align: center;
  margin: 0 0 $spacing-md;
}

.divider {
  height: 1px;
  background: $border-color;
  margin: $spacing-md 0;
}

.article-content {
  font-size: $font-size-base;
  line-height: 1.8;
  color: $text-primary;
  min-height: 200px;

  :deep(p) {
    margin: $spacing-sm 0;
    text-indent: 2em;
  }

  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    text-indent: 0;
    color: $primary-color;
  }
}

.article-nav {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-top: $spacing-xl;
  padding-top: $spacing-md;
  border-top: 1px solid $border-color;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-base;
  color: $primary-color;
  text-decoration: none;
  padding: $spacing-sm;
  border-radius: $card-radius;
  transition: background 0.2s;

  &:hover {
    background: $bg-page;
  }

  &.disabled {
    color: $text-muted;
  }

  &.prev {
    justify-content: flex-start;
  }

  &.next {
    justify-content: flex-end;
  }
}
</style>
