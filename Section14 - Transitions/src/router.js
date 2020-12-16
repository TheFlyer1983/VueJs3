import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./pages/AllUsers.vue'),
  },
  {
    path: '/goals',
    component: () => import('./pages/CourseGoals.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
