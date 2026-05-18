<template>
  <header class="portal-header">
    <!-- 顶部工具栏 -->
    <div class="top-bar">
      <div class="page-container top-bar-inner">
        <div class="top-left">
          <span class="site-name-full">泗洪县人民检察院</span>
        </div>
        <div class="top-right">
          <a href="#" class="top-link" @click.prevent="showToast('无障碍浏览')">网站无障碍</a>
          <span class="top-sep">|</span>
          <a href="#" class="top-link" @click.prevent="showToast('English')">English</a>
          <span class="top-sep">|</span>
          <router-link to="/admin/login" class="top-link">内部邮箱</router-link>
        </div>
      </div>
    </div>

    <!-- 主标题区 -->
    <div class="header-main">
      <div class="page-container header-main-inner">
        <div class="header-logo">
          <div class="emblem">
            <svg viewBox="0 0 60 60" width="60" height="60">
              <circle cx="30" cy="30" r="28" fill="#b71c1c" stroke="#d4a843" stroke-width="2"/>
              <path d="M30 8L34 20H46L36 28L40 40L30 32L20 40L24 28L14 20H26Z" fill="#d4a843"/>
              <circle cx="30" cy="30" r="10" fill="#b71c1c" stroke="#d4a843" stroke-width="1"/>
              <circle cx="30" cy="30" r="3" fill="#d4a843"/>
            </svg>
          </div>
          <div class="header-text">
            <h1 class="site-title">泗洪县人民检察院</h1>
            <p class="site-subtitle"> Sihong County People's Procuratorate</p>
          </div>
        </div>
        <div class="header-actions">
          <router-link to="/login" class="login-btn tap-active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>登录</span>
          </router-link>
          <router-link to="/admin/login" class="admin-btn tap-active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>管理</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 红色导航栏 -->
    <nav class="header-nav">
      <div class="page-container nav-inner">
        <ul class="nav-list">
          <li>
            <router-link to="/" :class="{ active: $route.path === '/' }">首页</router-link>
          </li>
          <li v-for="item in navItems" :key="item.path">
            <router-link :to="item.path" :class="{ active: $route.path.startsWith(item.path) }">
              {{ item.label }}
            </router-link>
          </li>
          <li>
            <a href="https://www.12309.gov.cn" target="_blank" class="nav-special">12309中国检察网</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const showToast = (msg: string) => {
  ElMessage.info({ message: msg, duration: 1500 })
}

const navItems = [
  { label: '机构设置', path: '/modules/org' },
  { label: '检察新闻', path: '/modules/news' },
  { label: '权威发布', path: '/modules/authority' },
  { label: '检察业务', path: '/modules/business' },
  { label: '检察院建设', path: '/modules/building' },
  { label: '检察文化', path: '/modules/culture' },
  { label: '通知公告', path: '/modules/notices' },
  { label: '法律法规库', path: '/modules/laws' },
  { label: '指导性案例', path: '/modules/cases' },
]
</script>

<style lang="scss" scoped>
.portal-header {
  background: $bg-white;
  position: relative;
}

// ===== 顶部工具栏 =====
.top-bar {
  background: #f8f8f8;
  border-bottom: 1px solid $border-light;
  height: $topbar-height;
  font-size: $font-size-xs;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.site-name-full {
  font-weight: 600;
  color: $primary-color;
}

.top-left {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.top-right {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

.top-link {
  color: $text-secondary;
  text-decoration: none;
  padding: 2px 4px;
  transition: color $transition-fast;

  &:hover {
    color: $primary-color;
  }
}

.top-sep {
  color: $border-dark;
  font-size: $font-size-xs;
}

// ===== 主标题区 =====
.header-main {
  background: linear-gradient(180deg, #fff 0%, #fdf2f2 100%);
  padding: $spacing-xl 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, $gold-color, transparent);
  }
}

.header-main-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.emblem {
  flex-shrink: 0;
}

.header-text {
  flex: 1;
}

.site-title {
  font-size: 36px;
  font-weight: 700;
  color: $primary-color;
  margin: 0;
  letter-spacing: 6px;
  font-family: $font-family-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.site-subtitle {
  font-size: $font-size-sm;
  color: $text-muted;
  margin: 2px 0 0;
  letter-spacing: 1px;
  font-family: $font-family;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.login-btn,
.admin-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border: 1px solid $primary-color;
  border-radius: $card-radius-sm;
  color: $primary-color;
  font-size: $font-size-sm;
  text-decoration: none;
  transition: all $transition-fast;

  &:hover {
    background: $primary-color;
    color: #fff;
  }
}

.admin-btn {
  border-color: $text-muted;
  color: $text-secondary;

  &:hover {
    background: $text-secondary;
    border-color: $text-secondary;
    color: #fff;
  }
}

// ===== 红色导航栏 =====
.header-nav {
  background: $primary-color;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-inner {
  position: relative;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-list li a {
  display: block;
  padding: 12px 14px;
  color: rgba(255, 255, 255, 0.85);
  font-size: $font-size-base;
  text-decoration: none;
  transition: all $transition-fast;
  white-space: nowrap;
  position: relative;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: #fff;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.12);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 2px;
      background: $gold-color;
    }
  }
}

.nav-special {
  color: $gold-light !important;
  font-weight: 600;

  &:hover {
    color: $gold-color !important;
    background: rgba(255, 255, 255, 0.05) !important;
  }
}

@media (max-width: 1200px) {
  .nav-list li a {
    padding: 10px 10px;
    font-size: $font-size-sm;
  }
}

@media (max-width: 768px) {
  .site-title {
    font-size: 24px;
    letter-spacing: 2px;
  }
  .site-subtitle {
    display: none;
  }
  .emblem svg {
    width: 40px;
    height: 40px;
  }
  .nav-list {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar { display: none; }
  }
  .header-actions span {
    display: none;
  }
}
</style>
