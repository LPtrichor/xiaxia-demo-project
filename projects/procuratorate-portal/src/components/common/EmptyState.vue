<template>
  <div class="empty-state">
    <el-icon v-if="icon" :size="64" color="#dcdfe6">
      <component :is="iconMap[icon!]" />
    </el-icon>
    <el-icon v-else :size="64" color="#dcdfe6">
      <Document />
    </el-icon>
    <p class="empty-title">{{ title }}</p>
    <p class="empty-desc">{{ description }}</p>
    <el-button
      v-if="actionText"
      type="primary"
      @click="$emit('action')"
    >
      {{ actionText }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Document, ChatLineRound, Search, QuestionFilled } from '@element-plus/icons-vue'

defineProps<{
  title?: string
  description?: string
  icon?: 'document' | 'chat' | 'search' | 'question'
  actionText?: string
}>()

defineEmits<{
  action: []
}>()

const iconMap: Record<string, any> = {
  document: Document,
  chat: ChatLineRound,
  search: Search,
  question: QuestionFilled,
}
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xxl;
  text-align: center;
}

.empty-title {
  font-size: $font-size-lg;
  color: $text-secondary;
  margin: $spacing-md 0 $spacing-xs;
}

.empty-desc {
  font-size: $font-size-base;
  color: $text-muted;
  margin: 0 0 $spacing-lg;
}
</style>
