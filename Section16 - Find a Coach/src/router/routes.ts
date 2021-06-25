import { RouteRecordRaw } from 'vue-router';
import { routerPaths } from './router-paths';

export const routes: Array<RouteRecordRaw> = [
  {
    path: routerPaths.root.path,
    name: routerPaths.root.name,
    redirect: routerPaths.coaches.path,
  },
  {
    path: routerPaths.coaches.path,
    name: routerPaths.coaches.name,
    component: () => import('@/pages/coaches/CoachesList.vue'),
  },
  {
    path: routerPaths.coachDetails.path,
    name: routerPaths.coachDetails.name,
    component: () => import('@/pages/coaches/CoachesDetail.vue'),
    props: true,
    children: [
      {
        path: routerPaths.contact.path,
        name: routerPaths.contact.name,
        component: () => import('@/pages/requests/ContactCoach.vue'),
      },
    ],
  },
  {
    path: routerPaths.register.path,
    name: routerPaths.register.name,
    component: () => import('@/pages/coaches/CoachRegistration.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: routerPaths.requests.path,
    name: routerPaths.requests.name,
    component: () => import('@/pages/requests/RequestsReceived.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: routerPaths.auth.path,
    name: routerPaths.auth.name,
    component: () => import('@/pages/auth/UserAuth.vue'),
    meta: { requiresUnauth: true },
  },
  {
    path: routerPaths.notFound.path,
    name: routerPaths.notFound.name,
    component: () => import('@/pages/NotFound.vue'),
  },
];
