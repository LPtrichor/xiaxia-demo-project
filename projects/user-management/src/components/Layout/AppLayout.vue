<template>
  <el-container class="app-container">
    <el-aside width="200px">
      <AppSidebar />
    </el-aside>
    <el-main class="main-content">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
</script>
