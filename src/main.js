import { createApp } from 'vue'
import App from './App.vue'
import * as vueRouter from 'vue-router';
import routes from './config/route'
import { Image as VanImage } from 'vant';


const router = vueRouter.createRouter({
  history:vueRouter.createWebHashHistory(),
  routes,
})

const app = createApp(App)
export default router;
app.use(router)
app.use(VanImage);
app.mount('#app')
 