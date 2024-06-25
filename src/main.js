import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Quasar)
app.mount('#app')

createApp(App).use(router).mount('#app')
