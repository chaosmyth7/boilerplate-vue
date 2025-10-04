import featureARoutes from '@/features/feature-a/routes'
import utilRoutes from '@/shared/routes'

import { createRouter, createWebHistory } from 'vue-router'

const listRoutes = [...featureARoutes, ...utilRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: listRoutes,
})

export default router
