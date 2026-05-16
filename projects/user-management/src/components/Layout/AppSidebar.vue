<template>
  <el-menu
    :default-active="activeMenu"
    class="sidebar-menu"
    background-color="#001529"
    text-color="#ffffffb3"
    active-text-color="#1890ff"
    :router="true"
  >
    <div class="logo">
      <h2>用户管理系统</h2>
    </div>
    <el-menu-item index="/user-list">
      <el-icon><UserFilled /></el-icon>
      <span>用户列表</span>
    </el-menu-item>
    <el-menu-item index="/operation-log">
      <el-icon><Document /></el-icon>
      <span>操作日志</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { UserFilled, Document } from '@element-plus/icons-vue';

const route = useRoute();
const activeMenu = computed(() => route.path as string);
</script>

<style scoped>
.sidebar-menu {
  height: 100%;
  border-right: none;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #002140;
  color: #fff;
}

.logo h2 {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}
</style>
