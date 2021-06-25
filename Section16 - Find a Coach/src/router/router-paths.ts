import { RouterPaths } from './types';

export const routerPaths: RouterPaths = {
  root: {
    path: '/',
    name: 'root',
  },
  coaches: {
    path: '/coaches',
    name: 'coaches',
  },
  coachDetails: {
    path: '/coaches/:id',
    name: 'coach-details',
  },
  contact: {
    path: 'contact',
    name: 'contact',
  },
  register: {
    path: '/register',
    name: 'register',
  },
  requests: {
    path: '/requests',
    name: 'requests',
  },
  auth: {
    path: '/auth',
    name: 'auth',
  },
  notFound: {
    path: '/:notFound(.*)',
    name: 'not-found',
  },
};
