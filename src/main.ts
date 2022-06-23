import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

createApp(App).use(router).mount('#app')
