import { createRouter, createWebHistory } from 'vue-router';

// import TeamsList from './components/teams/TeamsList.vue';
// import UsersList from './components/users/UsersList.vue';

const routes = [
  {
    path: '/',
    redirect: '/teams',
  },
  {
    path: '/teams', // our-domain.com/teams => ...
    name: 'teams',
    meta: {
      needsAuth: true,
    },
    // component: () => import('./components/teams/TeamsList.vue'),
    components: {
      default: () => import('./components/teams/TeamsList.vue'),
      footer: () => import('./components/teams/TeamsFooter.vue'),
    },
    // alias: '/',
    children: [
      {
        path: ':teamId',
        name: 'team-members',
        component: () => import('./components/teams/TeamMembers.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/users', // our-domain.com/users => ...
    name: 'users',
    components: {
      default: () => import('./components/users/UsersList.vue'),
      footer: () => import('./components/users/UsersFooter.vue'),
    },
    beforeEnter(to, from, next) {
      console.log('Users beforeEnter');
      console.log(to, from);
      next();
    },
  },
  {
    path: '/:notFound(.*)',
    component: () => import('./components/nav/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      to: 0,
      from: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs Auth!');
    next();
  } else {
    next();
  }
  // if (to.name === 'users') {
  //   next();
  // } else {
  //   next('/users');
  // }
  next();
});

router.afterEach((to, from) => {
  // sending analytics data
  console.log('Global afterEach');
  console.log(to, from);
})

export default router;
