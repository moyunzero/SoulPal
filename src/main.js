import { createApp } from 'vue'
import App from './App.vue'
import * as vueRouter from 'vue-router';
import routes from './config/route'

const router = vueRouter.createRouter({
  history:vueRouter.createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')
 