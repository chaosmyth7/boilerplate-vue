import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import "./assets/main.css"
import { i18n } from "./plugins/language/index"
import { installVueQuery } from "./plugins/tanstack"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
installVueQuery(app)

app.mount("#app")
