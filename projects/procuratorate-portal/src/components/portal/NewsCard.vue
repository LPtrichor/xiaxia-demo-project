<template>
  <article class="news-card" @click="$router.push(article.link)">
    <div class="news-thumb" :style="{ background: article.coverImage ? `url(${article.coverImage}) center/cover` : articleGradient }">
      <div class="news-thumb-overlay"></div>
    </div>
    <div class="news-body">
      <h3 class="news-title text-ellipsis">{{ article.title }}</h3>
      <p v-if="article.summary" class="news-summary text-clamp">{{ article.summary }}</p>
      <div class="news-meta">
        <span class="news-category">{{ article.category }}</span>
        <span class="news-date">{{ article.date }}</span>
        <span v-if="article.viewCount" class="news-views">
          <el-icon :size="12"><View /></el-icon>
          {{ article.viewCount }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { View } from '@element-plus/icons-vue'
import type { NewsItem } from '@/composables/useMockData'

const props = defineProps<{
  article: NewsItem
  index?: number
}>()

const gradients = [
  'linear-gradient(135deg, #1a3a5c, #2d5a8e)',
  'linear-gradient(135deg, #2d5a8e, #4a7ab5)',
  'linear-gradient(135deg, #1a3a5c, #c41e24)',
  'linear-gradient(135deg, #0f2440, #1a3a5c)',
  'linear-gradient(135deg, #c41e24, #1a3a5c)',
]

const articleGradient = computed(() => {
  const idx = props.index ?? 0
  return gradients[idx % gradients.length]
})
</script>

<style lang="scss" scoped>
.news-card {
  display: flex;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: $bg-white;
  border-radius: $card-radius;
  box-shadow: $shadow-sm;
  cursor: pointer;
  transition: all $transition-base;
  border: 1px solid $border-light;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
    border-color: transparent;

    .news-thumb-overlay {
      opacity: 1;
    }

    .news-title {
      color: $accent-color;
    }
  }
}

.news-thumb {
  width: 160px;
  height: 110px;
  border-radius: $card-radius-sm;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.news-thumb-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2));
  opacity: 0;
  transition: opacity $transition-base;
}

.news-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.news-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
  transition: color $transition-fast;
}

.news-summary {
  font-size: $font-size-base;
  color: $text-secondary;
  margin: 0;
  line-height: $line-height-base;
  flex: 1;
}

.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  gap: $spacing-lg;
  font-size: 12px;
  color: $text-muted;
  align-items: center;
}

.news-category {
  color: $primary-light;
  font-weight: 500;
  background: rgba($primary-light, 0.08);
  padding: 2px 8px;
  border-radius: 3px;
}

.news-views {
  display: flex;
  align-items: center;
  gap: 2px;
}

@media (max-width: 768px) {
  .news-thumb {
    width: 100px;
    height: 70px;
  }
  .news-card {
    gap: $spacing-md;
    padding: $spacing-md;
  }
}
</style>
