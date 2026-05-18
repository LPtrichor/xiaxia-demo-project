<template>
  <div v-if="attachments && attachments.length > 0" class="attachment-list">
    <h4 class="list-title">
      <el-icon><Paperclip /></el-icon> 附件下载
    </h4>
    <ul class="attachment-items">
      <li v-for="att in attachments" :key="att.id" class="attachment-item">
        <el-icon :size="18" color="#909399"><Document /></el-icon>
        <span class="file-name">{{ att.name }}</span>
        <span class="file-size">({{ att.size }})</span>
        <el-link type="primary" :href="att.url" :download="att.name" :underline="false">
          <el-icon><Download /></el-icon> 下载
        </el-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Paperclip, Document, Download } from '@element-plus/icons-vue'
import type { Attachment } from '@/types'

defineProps<{
  attachments?: Attachment[]
}>()
</script>

<style lang="scss" scoped>
.attachment-list {
  background: $bg-page;
  border-radius: $card-radius;
  padding: $spacing-md;
}

.list-title {
  margin: 0 0 $spacing-sm;
  font-size: $font-size-lg;
  color: $primary-color;
  display: flex;
  align-items: center;
  gap: 6px;
}

.attachment-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: $bg-white;
  border-radius: $card-radius;
}

.file-name {
  flex: 1;
  font-size: $font-size-base;
  color: $text-primary;
}

.file-size {
  font-size: 12px;
  color: $text-muted;
  flex-shrink: 0;
}
</style>
