<template>
  <el-card class="stat-card" shadow="hover">
    <div class="stat-content">
      <div class="stat-icon" :style="{ backgroundColor: color }">
        <el-icon :size="28"><component :is="iconComponent" /></el-icon>
      </div>
      <div class="stat-info">
        <div class="stat-title">{{ title }}</div>
        <div class="stat-value">{{ value }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Document,
  Calendar,
  UserFilled,
  View,
  Timer,
  TrendCharts,
} from '@element-plus/icons-vue'

const props = defineProps<{
  title: string
  value: string | number
  icon: string
  color: string
}>()

const iconMap: Record<string, any> = {
  Document,
  Calendar,
  UserFilled,
  View,
  Timer,
  TrendCharts,
}

const iconComponent = computed(() => iconMap[props.icon] || Document)
</script>

<style scoped lang="scss">
.stat-card {
  border-radius: 4px;

  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 13px;
  color: $text-muted;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: $text-primary;
}
</style>
