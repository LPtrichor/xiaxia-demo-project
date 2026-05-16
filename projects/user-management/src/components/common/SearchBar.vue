<template>
  <div class="search-bar">
    <el-input
      v-model="query.keyword"
      placeholder="搜索姓名/手机号"
      clearable
      style="width: 200px"
      @keyup.enter="emit('search')"
      @clear="emit('search')"
    />
    <el-select
      v-model="query.role"
      placeholder="角色筛选"
      clearable
      style="width: 140px"
      @change="emit('search')"
    >
      <el-option label="管理员" value="admin" />
      <el-option label="普通用户" value="user" />
      <el-option label="只读用户" value="readonly" />
    </el-select>
    <el-select
      v-model="query.status"
      placeholder="状态筛选"
      clearable
      style="width: 140px"
      @change="emit('search')"
    >
      <el-option label="启用" value="active" />
      <el-option label="禁用" value="disabled" />
    </el-select>
    <el-button type="primary" @click="emit('search')">
      <el-icon><Search /></el-icon>
      搜索
    </el-button>
    <el-button @click="emit('reset')">
      <el-icon><RefreshLeft /></el-icon>
      重置
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { UserQuery } from '@/api/types';
import { Search, RefreshLeft } from '@element-plus/icons-vue';

defineProps<{
  query: UserQuery;
}>();

const emit = defineEmits<{
  search: [];
  reset: [];
}>();
</script>
