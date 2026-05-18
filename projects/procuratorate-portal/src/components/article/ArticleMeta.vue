<template>
  <div class="article-meta">
    <span v-if="article.author" class="meta-item">
      <el-icon><User /></el-icon> 作者：{{ article.author }}
    </span>
    <span class="meta-item">
      <el-icon><Calendar /></el-icon> 发布时间：{{ formatDate(article.publishDate) }}
    </span>
    <span class="meta-item">
      <el-icon><View /></el-icon> 浏览：{{ article.viewCount }}
    </span>
    <span v-if="article.source" class="meta-item">
      来源：{{ article.source }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Calendar, View, User } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import type { Article } from '@/types'

defineProps<{
  article: Article
}>()

function formatDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}
</script>

<style lang="scss" scoped>
.article-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;
  padding: $spacing-sm 0;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: $text-muted;

  .el-icon {
    font-size: 14px;
  }
}
</style>
