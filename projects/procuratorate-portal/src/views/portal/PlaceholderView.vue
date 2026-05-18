<template>
  <div class="placeholder-view page-container">
    <EmptyState
      :title="`${moduleName}`"
      description="页面建设中，敬请期待..."
      icon="document"
      action-text="返回首页"
      @action="$router.push('/')"
    />
  </div>
</template>

<script setup lang="ts">
import EmptyState from '@/components/common/EmptyState.vue'

defineProps<{
  moduleName?: string
}>()
</script>

<style lang="scss" scoped>
.placeholder-view {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
