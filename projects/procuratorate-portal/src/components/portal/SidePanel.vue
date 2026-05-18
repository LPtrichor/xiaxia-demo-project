<template>
  <aside class="side-panel">
    <el-tabs v-model="activeTab" class="panel-tabs">
      <el-tab-pane label="公告" name="announcements">
        <ul class="panel-list">
          <li
            v-for="item in announcements.slice(0, 6)"
            :key="item.id"
            class="panel-item"
            @click="$router.push(item.link)"
          >
            <span class="type-dot" :class="item.type"></span>
            <span class="item-title text-ellipsis">{{ item.title }}</span>
            <span class="item-date">{{ item.date }}</span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="统计" name="stats">
        <div class="stats-grid">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="stat-card"
          >
            <p class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="quick-nav-section">
      <h3 class="section-subtitle">快捷入口</h3>
      <div class="quick-nav-mini">
        <div
          v-for="item in quickNavItems"
          :key="item.id"
          class="quick-nav-item"
          @click="$router.push(item.routePath)"
        >
          <el-icon :size="20" :color="item.color">
            <component :is="iconMap[item.icon]" />
          </el-icon>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Microphone,
  OfficeBuilding,
  Reading,
  Download,
  Document,
  Flag,
  School,
  FolderOpened,
} from '@element-plus/icons-vue'
import { useAnnouncementData, useQuickNavData } from '@/composables/useMockData'
import { computed } from 'vue'

const announcements = useAnnouncementData()
const quickNavItems = useQuickNavData()

const stats = computed(() => [
  { label: '文章总数', value: '46', color: '#c41e24' },
  { label: '本月更新', value: '12', color: '#1a3a5c' },
])

const activeTab = ref('announcements')

const iconMap: Record<string, any> = {
  Microphone,
  OfficeBuilding,
  Reading,
  Download,
  Document,
  Flag,
  School,
  FolderOpened,
}
</script>

<style lang="scss" scoped>
.side-panel {
  background: $bg-white;
  border-radius: $card-radius;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.panel-tabs {
  :deep(.el-tabs__header) {
    margin: 0;
    padding: 0 $spacing-md;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }

  :deep(.el-tabs__item) {
    font-size: $font-size-lg;
    font-weight: 600;
  }

  :deep(.el-tabs__content) {
    padding: 0;
  }
}

.panel-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.panel-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $bg-page;
  }

  &:not(:last-child) {
    border-bottom: 1px dashed $border-color;
  }
}

.type-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.type-dot.info {
  background: #909399;
}

.type-dot.warning {
  background: $warning-color;
}

.type-dot.urgent {
  background: $danger-color;
}

.item-title {
  flex: 1;
  font-size: $font-size-base;
  color: $text-primary;
  min-width: 0;
}

.item-date {
  font-size: 12px;
  color: $text-muted;
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-sm;
  padding: $spacing-md;
}

.stat-card {
  text-align: center;
  padding: $spacing-md $spacing-sm;
  background: $bg-page;
  border-radius: $card-radius;
}

.stat-value {
  font-size: $font-size-xl;
  font-weight: 700;
  margin: 0;
}

.stat-label {
  font-size: 12px;
  color: $text-muted;
  margin: $spacing-xs 0 0;
}

.quick-nav-section {
  border-top: 1px solid $border-color;
  padding: $spacing-md;
}

.section-subtitle {
  font-size: $font-size-base;
  font-weight: 600;
  color: $primary-color;
  margin: 0 0 $spacing-sm 0;
}

.quick-nav-mini {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-sm;
}

.quick-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: $spacing-sm;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
  color: $text-secondary;

  &:hover {
    border-color: $primary-light;
    color: $primary-color;
    transform: translateY(-2px);
  }
}
</style>
