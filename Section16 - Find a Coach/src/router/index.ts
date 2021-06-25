import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

import store from '../store';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters[`auth/isAuthenticated`]) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters[`auth/isAuthenticated`]) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
