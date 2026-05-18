<template>
  <div class="search-bar">
    <el-input
      v-model="keyword"
      :placeholder="placeholder"
      clearable
      @keyup.enter="handleSearch"
    >
      <template #append>
        <el-button @click="handleSearch">
          <el-icon><Search /></el-icon> 搜索
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const emit = defineEmits<{
  search: [keyword: string]
}>()

defineProps<{
  placeholder?: string
}>()

const keyword = ref('')

function handleSearch() {
  emit('search', keyword.value.trim())
}
</script>

<style lang="scss" scoped>
.search-bar {
  max-width: 400px;
}
</style>
