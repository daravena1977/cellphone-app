import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

//import AuthLayout from '@/modules/auth/layouts/AuthLayout'

import authRouter from '@/modules/auth/router'
import setupRouter from '@/modules/setup/router'

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
