import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Main from '@/components/Main.vue'
import { initRouterGuard } from '@/router/routerGuard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/Employees.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/Products.vue')
      },
      {
        path: 'allocations',
        name: 'Allocations',
        component: () => import('@/views/Allocations.vue')
      },
      {
        path: 'process',
        name: 'Process',
        component: () => import('@/views/Process.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

/** Setup Vue Router */
export async function setupRouter(app: App) {
  app.use(router);
  initRouterGuard(router);
  await router.isReady();
}