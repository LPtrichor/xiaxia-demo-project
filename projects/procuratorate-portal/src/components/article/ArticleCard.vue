<template>
  <div class="article-card" @click="handleClick">
    <div class="card-top">
      <el-tag v-if="article.isTop" class="top-tag" type="danger" size="small" effect="dark">
        🔝 置顶
      </el-tag>
      <h3 class="article-title">
        <router-link :to="{ name: 'article-detail', params: { id: article.id } }">
          {{ article.title }}
        </router-link>
      </h3>
    </div>
    <p v-if="article.summary" class="article-summary">{{ article.summary }}</p>
    <div class="article-footer">
      <span class="meta-item">
        <el-icon><Calendar /></el-icon>
        {{ formatDate(article.publishDate) }}
      </span>
      <span class="meta-item">
        <el-icon><View /></el-icon>
        {{ formatViews(article.viewCount) }}
      </span>
      <span v-if="article.author" class="meta-item">
        <el-icon><User /></el-icon>
        {{ article.author }}
      </span>
      <span v-if="article.attachments?.length" class="meta-item">
        <el-icon><Paperclip /></el-icon>
        {{ article.attachments.length }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, View, User, Paperclip } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import type { Article } from '@/types'

const props = defineProps<{
  article: Article
}>()

function formatDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD')
}

function formatViews(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}

function handleClick() {
  // let router-link handle navigation
}
</script>

<style lang="scss" scoped>
.article-card {
  padding: $spacing-lg;
  border-bottom: 1px solid $border-light;
  cursor: pointer;
  transition: all $transition-base;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: $accent-color;
    transform: scaleY(0);
    transition: transform $transition-base;
  }

  &:hover {
    background: $bg-page;

    &::before {
      transform: scaleY(1);
    }

    .article-title a {
      color: $accent-color;
    }
  }

  &:last-child {
    border-bottom: none;
  }
}

.card-top {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.top-tag {
  flex-shrink: 0;
  font-weight: 500;
}

.article-title {
  font-size: $font-size-lg;
  font-weight: 600;
  margin: 0;
  line-height: $line-height-tight;
  flex: 1;

  a {
    color: $text-primary;
    text-decoration: none;
    transition: color $transition-fast;

    &:hover {
      color: $primary-color;
    }
  }
}

.article-summary {
  font-size: $font-size-base;
  color: $text-secondary;
  line-height: $line-height-relaxed;
  margin: 0 0 $spacing-sm;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: $text-muted;

  .el-icon {
    font-size: 14px;
    opacity: 0.7;
  }
}
</style>
