import { RouteName } from '@/types/routes'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
    path: '/demo',
    name: RouteName.Demo,
    component: () => import('@/views/DemoView.vue'),
    meta: { hideLayout: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

export default router
