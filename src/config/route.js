import Index from '../views/index.vue'
import Square from '../views/square.vue'
import User from '../views/user.vue'
import Chat from '../views/chat.vue'
import Search from '../views/search.vue'

// 定义路由
const routes = [
  {path: '/', component:Index},
  {path: '/square', component:Square},
  {path: '/chat', component:Chat},
  {path: '/user', component:User},
  {path: '/search', component:Search},
]

export default routes