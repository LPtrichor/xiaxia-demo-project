<template>
  <section class="quick-nav-grid">
    <div class="grid-header">
      <span class="header-icon">⚡</span>
      <h2 class="section-title">常用功能</h2>
    </div>
    <div class="grid-container">
      <div
        v-for="(item, idx) in quickNavItems"
        :key="item.id"
        class="nav-card"
        :style="{ '--delay': `${idx * 0.05}s` }"
        @click="$router.push(item.routePath)"
      >
        <div class="nav-card-bg" :style="{ background: item.color }"></div>
        <div class="nav-card-content">
          <div class="nav-icon-wrapper" :style="{ background: item.color + '15', color: item.color }">
            <el-icon :size="24">
              <component :is="iconMap[item.icon]" />
            </el-icon>
          </div>
          <span class="nav-label">{{ item.label }}</span>
          <div class="nav-arrow">→</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
import { useQuickNavData } from '@/composables/useMockData'

const quickNavItems = useQuickNavData()

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
.quick-nav-grid {
  background: $bg-white;
  border-radius: $card-radius;
  padding: $spacing-lg $spacing-xl;
  box-shadow: $shadow-sm;
  transition: box-shadow $transition-base;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.grid-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 2px solid $accent-color;
}

.header-icon {
  font-size: 20px;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $primary-color;
  margin: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
}

.nav-card {
  position: relative;
  border-radius: $card-radius;
  overflow: hidden;
  cursor: pointer;
  transition: all $transition-base;
  border: 1px solid $border-light;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
    border-color: transparent;

    .nav-card-bg {
      opacity: 1;
    }

    .nav-icon-wrapper {
      transform: scale(1.1);
    }

    .nav-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .nav-label {
      color: #fff;
    }
  }
}

.nav-card-bg {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity $transition-base;
  z-index: 0;
}

.nav-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-xl $spacing-sm;
  transition: all $transition-base;
}

.nav-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all $transition-bounce;
}

.nav-label {
  font-size: $font-size-base;
  color: $text-secondary;
  font-weight: 500;
  transition: color $transition-base;
}

.nav-arrow {
  font-size: 18px;
  color: #fff;
  opacity: 0;
  transform: translateX(-4px);
  transition: all $transition-base;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
