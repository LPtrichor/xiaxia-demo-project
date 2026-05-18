<template>
  <div class="admin-dashboard">
    <h2 class="page-title">欢迎回来，{{ currentUser?.realName || currentUser?.username || '管理员' }}</h2>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6">
        <StatCards title="文章总数" :value="totalArticles" icon="Document" color="#1a3a5c" />
      </el-col>
      <el-col :span="6">
        <StatCards title="本月更新" :value="monthArticles" icon="Calendar" color="#2d5a8e" />
      </el-col>
      <el-col :span="6">
        <StatCards title="用户总数" :value="totalUsers" icon="UserFilled" color="#67c23a" />
      </el-col>
      <el-col :span="6">
        <StatCards title="今日访问" :value="todayVisits" icon="View" color="#e6a23c" />
      </el-col>
    </el-row>

    <el-row :gutter="20" class="table-row">
      <!-- 最近文章 -->
      <el-col :span="14">
        <el-card class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>最近发布文章</span>
              <el-button type="primary" text size="small" @click="$router.push('/admin/content')">
                查看全部
              </el-button>
            </div>
          </template>
          <el-table :data="recentArticles" stripe style="width: 100%">
            <el-table-column prop="title" label="标题" show-overflow-tooltip />
            <el-table-column label="栏目" width="100">
              <template #default="{ row }">
                <el-tag size="small" type="info">{{ getCategoryName(row.category) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="80" />
            <el-table-column label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="statusType(row.status)" size="small">
                  {{ statusLabel(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="发布日期" width="120">
              <template #default="{ row }">
                {{ formatDate(row.publishDate) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 最近登录 -->
      <el-col :span="10">
        <el-card class="dashboard-card">
          <template #header>最近登录记录</template>
          <el-table :data="recentLogins" stripe style="width: 100%">
            <el-table-column prop="realName" label="用户" show-overflow-tooltip />
            <el-table-column label="角色" width="80">
              <template #default="{ row }">
                <el-tag :type="row.role === 'admin' ? 'danger' : 'warning'" size="small">
                  {{ row.role === 'admin' ? '管理员' : '编辑员' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="登录时间" width="140">
              <template #default="{ row }">
                {{ row.lastLoginAt ? formatDate(row.lastLoginAt) : '-' }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import StatCards from '@/components/admin/StatCards.vue'
import { getArticles, getUsers, getCategoryName } from '@/composables/useMockData'
import type { Article } from '@/types/article'
import type { User } from '@/types/user'

const allArticles = getArticles()
const allUsers = getUsers()

// 当前用户
const currentUser = computed(() => {
  try {
    const raw = localStorage.getItem('proc_portal_current_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
})

// 统计数据
const totalArticles = computed(() => allArticles.length)

const monthArticles = computed(() => {
  const now = dayjs()
  return allArticles.filter((a: Article) => dayjs(a.publishDate).month() === now.month() && dayjs(a.publishDate).year() === now.year()).length
})

const totalUsers = computed(() => allUsers.length)

const todayVisits = computed(() => 128) // mock

// 最近文章（按日期排序，取 5 条）
const recentArticles = computed(() => {
  return [...allArticles]
    .sort((a: Article, b: Article) => dayjs(b.publishDate).valueOf() - dayjs(a.publishDate).valueOf())
    .slice(0, 5)
})

// 最近登录（取最后3个有登录时间的用户）
const recentLogins = computed(() => {
  return [...allUsers]
    .filter((u: User) => u.lastLoginAt)
    .sort((a: User, b: User) => dayjs(b.lastLoginAt).valueOf() - dayjs(a.lastLoginAt).valueOf())
    .slice(0, 3)
})

function formatDate(dateStr: string): string {
  return dayjs(dateStr).format('YYYY-MM-DD')
}

function statusType(status: string): string {
  const map: Record<string, string> = {
    published: 'success',
    draft: 'warning',
    archived: 'info',
  }
  return map[status] || 'info'
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    published: '已发布',
    draft: '草稿',
    archived: '已归档',
  }
  return map[status] || status
}
</script>

<style scoped lang="scss">
.admin-dashboard {
  padding: 8px 0;
}

.page-title {
  font-size: 20px;
  color: $text-primary;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid $border-color;
}

.stat-row {
  margin-bottom: 20px;
}

.table-row {
  margin-bottom: 20px;
}

.dashboard-card {
  margin-bottom: 0;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
