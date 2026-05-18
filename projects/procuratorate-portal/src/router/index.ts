import { createRouter, createWebHistory } from 'vue-router'
import PortalLayoutWrapper from '@/components/layout/PortalLayoutWrapper.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { isAuthenticated } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ========== 门户前台 ==========
    {
      path: '/',
      component: PortalLayoutWrapper,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/portal/HomeView.vue'),
        },
      ],
    },

    // 模块列表页
    {
      path: '/modules',
      component: PortalLayoutWrapper,
      children: [
        {
          path: 'leader-speech',
          name: 'leader-speech',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'leader-speech', title: '领导讲话' },
        },
        {
          path: 'dept-dynamic',
          name: 'dept-dynamic',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'dept-dynamic', title: '部门动态' },
        },
        {
          path: 'training',
          name: 'training',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'training', title: '学习培训' },
        },
        {
          path: 'file-download',
          name: 'file-download',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'file-download', title: '文件下载' },
        },
        {
          path: 'regulation',
          name: 'regulation',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'regulation', title: '规章制度' },
        },
        {
          path: 'party-building',
          name: 'party-building',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'party-building', title: '党建工作' },
        },
        {
          path: 'study-garden',
          name: 'study-garden',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'study-garden', title: '学习园地' },
        },
        {
          path: 'resource-share',
          name: 'resource-share',
          component: () => import('@/views/modules/ModuleListWrapper.vue'),
          props: { category: 'resource-share', title: '资料共享' },
        },
      ],
    },

    // 文章详情页
    {
      path: '/article/:id',
      name: 'article-detail',
      component: PortalLayoutWrapper,
      children: [
        {
          path: '',
          component: () => import('@/views/portal/ArticleDetailView.vue'),
        },
      ],
    },

    // ========== 用户登录 ==========
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },

    // ========== 后台登录 ==========
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/views/auth/AdminLoginView.vue'),
    },

    // ========== 后台管理 ==========
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/AdminDashboard.vue'),
        },
        {
          path: 'content',
          name: 'admin-content',
          component: () => import('@/views/admin/ContentManageView.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/UserManageView.vue'),
        },
      ],
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/components/common/EmptyState.vue'),
    },
  ],
})

// 路由守卫：后台权限检查
router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated('editor')) {
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
