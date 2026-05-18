<template>
  <section class="announcement-banner">
    <div class="banner-header">
      <div class="header-left">
        <span class="header-icon">📢</span>
        <h2 class="banner-title">通知公告</h2>
        <span class="header-count">{{ announcements.length }} 条</span>
      </div>
      <router-link to="/announcements" class="more-link">更多 →</router-link>
    </div>
    <div class="banner-body">
      <ul class="announcement-list">
        <li
          v-for="item in announcements.slice(0, 5)"
          :key="item.id"
          class="announcement-item"
          @click="$router.push(item.link)"
        >
          <span class="type-badge" :class="item.type">
            {{ typeLabels[item.type] }}
          </span>
          <span class="announcement-title text-ellipsis">{{ item.title }}</span>
          <span class="announcement-date">{{ item.date }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnnouncementData } from '@/composables/useMockData'
import type { AnnouncementType } from '@/composables/useMockData'

const announcements = useAnnouncementData()

const typeLabels: Record<AnnouncementType, string> = {
  info: '📋 通知',
  warning: '⚡ 预警',
  urgent: '🔴 紧急',
}
</script>

<style lang="scss" scoped>
.announcement-banner {
  background: $bg-white;
  border-radius: $card-radius;
  box-shadow: $shadow-sm;
  overflow: hidden;
  transition: box-shadow $transition-base;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.banner-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md $spacing-lg;
  background: linear-gradient(90deg, rgba($accent-color, 0.05), transparent);
  border-bottom: 2px solid $accent-color;
}

.header-left {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.header-icon {
  font-size: 18px;
}

.banner-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $primary-color;
  margin: 0;
}

.header-count {
  font-size: $font-size-xs;
  color: $text-muted;
  background: $bg-page;
  padding: 2px 8px;
  border-radius: 10px;
}

.more-link {
  font-size: $font-size-sm;
  color: $text-muted;
  text-decoration: none;
  transition: all $transition-fast;

  &:hover {
    color: $primary-light;
    transform: translateX(2px);
  }
}

.banner-body {
  padding: $spacing-xs 0;
}

.announcement-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.announcement-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 10px $spacing-lg;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background: $bg-page;

    .announcement-title {
      color: $primary-color;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px dashed $border-light;
  }
}

.type-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 3px;
  color: #fff;
  flex-shrink: 0;
  min-width: 44px;
  text-align: center;
  font-weight: 500;
}

.type-badge.info {
  background: linear-gradient(135deg, #909399, #a6a9ad);
}

.type-badge.warning {
  background: linear-gradient(135deg, $warning-color, #e6a23c);
}

.type-badge.urgent {
  background: linear-gradient(135deg, $accent-color, $accent-light);
  animation: urgentPulse 2s ease-in-out infinite;
}

@keyframes urgentPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.announcement-title {
  flex: 1;
  font-size: $font-size-base;
  color: $text-primary;
  transition: color $transition-fast;
}

.announcement-date {
  font-size: $font-size-xs;
  color: $text-muted;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
}
</style>
