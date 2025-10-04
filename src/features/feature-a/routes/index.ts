import type { RouteRecordRaw } from 'vue-router'
import { FeatureAPageName } from '../models'

const featureARoutes: RouteRecordRaw[] = [
  {
    path: '/feature-a',
    name: FeatureAPageName.FEATURE_A,
    component: () => import('@/features/feature-a/views/FeatureAView.vue'),
  },
]

export default featureARoutes
