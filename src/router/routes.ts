import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import Abilitys from '../views/Abilitys.vue'
import About from '@/views/About.vue'
import Status from '@/views/Status.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: 'habilidades', component: Abilitys },
      { path: 'sobre', component: About },
      { path: 'status', component: Status }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
