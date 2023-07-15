import {createApp} from 'vue'
// @ts-ignore
import {createRouter, createWebHashHistory} from "vue-router"
import routes from "./config/router";
import Vant from 'vant'
import App from './App.vue'
import 'vant/lib/index.css';

const app = createApp(App);
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.use(Vant);
app.use(router);
export default router;

app.mount('#app');
