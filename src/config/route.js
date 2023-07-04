import Index from "../pages/Index.vue";
import Circle from "../pages/Circle.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserLogin from "../pages/UserLogin.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import CircleCreate from "../pages/CircleCreate.vue";
import UserInfo from "../pages/UserInfo.vue";
import CircleMyJoin from "../pages/CircleMyJoin.vue";
import CircleMyCreate from "../pages/CircleMyCreate.vue";
import CircleUpdate from "../pages/CircleUpdate.vue";
import CirclePwdInput from "../pages/CirclePwdInput.vue";
import Tag from "../pages/Tag.vue";
import CircleInvite from "../pages/CircleInvite.vue";
import CircleMyInvitation from "../pages/CircleMyInvitation.vue";

const routes = [
    {path: '/', meta: {title: '主页',}, component: Index},
    {path: '/circle', meta: {title: '圈子',}, component: Circle},
    {path: '/user', meta: {title: '我的',}, component: User},
    {path: '/user/info', meta: {title: '个人信息',}, component: UserInfo},
    {path: '/user/login', meta: {title: '',}, component: UserLogin},
    {path: '/user/edit', meta: {title: '修改信息',}, component: UserEdit},
    {path: '/search', meta: {title: '搜索用户',}, component: Search},
    {path: '/search/result', meta: {title: '搜索结果',}, component: SearchResult},
    {path: '/circle/create', meta: {title: '创建圈子',}, component: CircleCreate},
    {path: '/circle/update', meta: {title: '更新圈子',}, component: CircleUpdate},
    {path: '/circle/myJoin', meta: {title: '我加入的圈子',}, component: CircleMyJoin},
    {path: '/circle/myCreate', meta: {title: '我创建的圈子',}, component: CircleMyCreate},
    {path: '/circle/pwdInput', meta: {title: '圈子密码',}, component: CirclePwdInput},
    {path: '/circle/invite', meta: {title: '选择圈子',}, component: CircleInvite},
    {path: '/circle/myInvitation', meta: {title: '收到的邀请',}, component: CircleMyInvitation},
    {path: '/tag', meta: {title: '标签管理',}, component: Tag},
]

export default routes