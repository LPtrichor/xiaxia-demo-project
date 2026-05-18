<template>
  <div class="pagination-bar">
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :pager-count="5"
      layout="prev, pager, next, jumper, total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

const currentPage = computed({
  get: () => props.current,
  set: (val: number) => emit('change', val),
})

function handleCurrentChange(page: number) {
  emit('change', page)
}
</script>

<style lang="scss" scoped>
.pagination-bar {
  display: flex;
  justify-content: center;
  padding: $spacing-lg 0;
}
</style>
