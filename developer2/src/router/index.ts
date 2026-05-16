import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/user-list',
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: () => import('@/views/UserList.vue'),
    },
    {
      path: '/operation-log',
      name: 'OperationLog',
      component: () => import('@/views/OperationLog.vue'),
    },
  ],
});

export default router;
