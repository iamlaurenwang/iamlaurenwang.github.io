import { RouteName } from '@/types/routes'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Landing,
    component: () => import('@/views/LandingView.vue'),
  },
  {
    path: '/visuals',
    name: RouteName.Visuals,
    component: () => import('@/views/VisualsView.vue'),
    children: [
      {
        path: '',
        name: RouteName.VisualsIndex,
        component: () => import('@/views/visuals/VisualsIndexView.vue'),
      },
      {
        path: 'flex-grid',
        name: RouteName.VisualsFlexGrid,
        component: () => import('@/views/visuals/FlexAndGrid.vue'),
      },
      {
        path: 'animation',
        name: RouteName.VisualsAnimation,
        component: () => import('@/views/visuals/AnimationDisplay.vue'),
      },
    ],
  },
  {
    path: '/notes',
    name: RouteName.Notes,
    component: () => import('@/views/NotesView.vue'),
  },
  {
    path: '/contact',
    name: RouteName.Contact,
    component: () => import('@/views/ContactView.vue'),
  },
  {
    path: '/tutoring',
    name: RouteName.Tutoring,
    component: () => import('@/views/TutoringView.vue'),
  },
  {
    path: '/demo',
    name: RouteName.Demo,
    component: () => import('@/views/DemoView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NotFound,
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

export default router
