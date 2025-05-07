import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUpView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignInView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/detailed/:id',
      name: 'detailed',
      component: () => import('../views/DetailedView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/modify',
      name: 'modify',
      component: () => import('../views/ModifyFormView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: () => import('../views/QuestionsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('../views/SongsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('../views/PlaylistView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.getItem('accessToken') || ''

  if (
    !accessToken &&
    (to.path.includes('/profile') || to.path.includes('/songs') || to.path.includes('/playlist'))
  ) {
    next('/')
    return
  } else if (accessToken && to.path == '/') {
    next('/songs')
    return
  }

  next()
})

export default router
