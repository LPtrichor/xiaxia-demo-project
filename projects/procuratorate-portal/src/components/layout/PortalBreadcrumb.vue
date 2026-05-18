<template>
  <div class="portal-breadcrumb page-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="categoryName">{{ categoryName }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="currentLabel">{{ currentLabel }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useMockData } from '@/composables/useMockData'
import type { CategoryCode } from '@/types'

const props = defineProps<{
  category?: CategoryCode
  currentLabel?: string
}>()

const { getCategoryName } = useMockData()

const categoryName = props.category ? getCategoryName(props.category) : ''
</script>

<style lang="scss" scoped>
.portal-breadcrumb {
  padding: $spacing-md 0;
}
</style>
