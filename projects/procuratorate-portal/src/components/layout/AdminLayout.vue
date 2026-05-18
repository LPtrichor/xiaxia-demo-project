<template>
  <div class="admin-layout">
    <el-container class="admin-container">
      <!-- 左侧侧边栏 -->
      <el-aside width="220px" class="admin-aside">
        <div class="logo-area">
          <span class="logo-text">检察门户管理</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="admin-menu"
          background-color="#1a2332"
          text-color="#b0c4de"
          active-text-color="#ffffff"
          router
        >
          <el-menu-item index="/admin">
            <el-icon><HomeFilled /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/admin/content">
            <el-icon><Document /></el-icon>
            <span>内容管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/users">
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
        <div class="logout-area">
          <el-button type="danger" text class="logout-btn" @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-button>
        </div>
      </el-aside>

      <!-- 右侧主体 -->
      <el-container class="admin-main">
        <!-- 顶部 -->
        <el-header class="admin-header">
          <div class="header-left">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
                {{ item.label }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <span class="user-name">
              <el-icon><User /></el-icon>
              {{ currentUser?.realName || currentUser?.username || '管理员' }}
            </span>
            <el-tag size="small" :type="roleTagType" class="role-tag">
              {{ roleLabel }}
            </el-tag>
            <el-button text @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>
              退出
            </el-button>
          </div>
        </el-header>

        <!-- 内容区 -->
        <el-main class="admin-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  HomeFilled,
  Document,
  UserFilled,
  SwitchButton,
  User,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { removeToken } from '@/stores/auth'

const route = useRoute()
const router = useRouter()

const activeMenu = computed(() => route.path)

const breadcrumbs = computed(() => {
  const map: Record<string, string> = {
    '/admin': '仪表盘',
    '/admin/content': '内容管理',
    '/admin/users': '用户管理',
  }
  const path = route.path
  const label = map[path]
  if (!label || path === '/admin') return []
  return [{ path, label }]
})

const currentUser = computed(() => {
  try {
    const raw = localStorage.getItem('proc_portal_current_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
})

const roleLabel = computed(() => {
  const role = currentUser.value?.role
  if (role === 'admin') return '管理员'
  if (role === 'editor') return '编辑员'
  return '用户'
})

const roleTagType = computed(() => {
  const role = currentUser.value?.role
  if (role === 'admin') return 'danger'
  if (role === 'editor') return 'warning'
  return 'info'
})

function handleLogout() {
  removeToken()
  ElMessage.success('已退出登录')
  router.push('/admin/login')
}
</script>

<style scoped lang="scss">
.admin-layout {
  height: 100vh;
  overflow: hidden;
}

.admin-container {
  height: 100%;
}

.admin-aside {
  background-color: #1a2332;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.logo-area {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .logo-text {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px;
  }
}

.admin-menu {
  flex: 1;
  border-right: none;
}

.logout-area {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .logout-btn {
    width: 100%;
    color: #f56c6c;

    &:hover {
      color: #f56c6c;
    }
  }
}

.admin-header {
  background: #fff;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;

  .user-name {
    display: flex;
    align-items: center;
    gap: 4px;
    color: $text-primary;
    font-size: 14px;
  }

  .role-tag {
    margin: 0;
  }
}

.admin-content {
  background: $bg-page;
  overflow-y: auto;
}
</style>
