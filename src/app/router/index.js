import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

//import AuthLayout from '@/modules/auth/layouts/AuthLayout'

import authRouter from '@/app/modules/auth/router'
import setupRouter from '@/app/modules/setup/router'

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    ...authRouter
  },
  {
    path: '/setup',
    ...setupRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
