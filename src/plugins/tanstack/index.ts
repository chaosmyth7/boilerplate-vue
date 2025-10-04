import { type App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryOptions } from './client'

export function installVueQuery(app: App) {
  app.use(VueQueryPlugin, vueQueryOptions)
}
