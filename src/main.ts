import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './plugins/language/index'

import App from './App.vue'
import router from './router'
import { installVueQuery } from './plugins/tanstack'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
installVueQuery(app)

app.mount('#app')
