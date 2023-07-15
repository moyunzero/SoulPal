// @ts-ignore
import Index from "../pages/Index.vue";
// @ts-ignore
import Circle from "../pages/Circle.vue";
// @ts-ignore
import User from "../pages/User.vue";
// @ts-ignore
import Search from "../pages/Search.vue";
// @ts-ignore
import UserLogin from "../pages/UserLogin.vue";
// @ts-ignore
import UserEdit from "../pages/UserEdit.vue";
// @ts-ignore
import SearchResult from "../pages/SearchResult.vue";
// @ts-ignore
import CircleCreate from "../pages/CircleCreate.vue";
// @ts-ignore
import UserInfo from "../pages/UserInfo.vue";
// @ts-ignore
import CircleMyJoin from "../pages/CircleMyJoin.vue";
// @ts-ignore
import CircleMyCreate from "../pages/CircleMyCreate.vue";
// @ts-ignore
import CircleUpdate from "../pages/CircleUpdate.vue";
// @ts-ignore
import CirclePwdInput from "../pages/CirclePwdInput.vue";
// @ts-ignore
import Tag from "../pages/Tag.vue";
// @ts-ignore
import CircleInvite from "../pages/CircleInvite.vue";
// @ts-ignore
import CircleMyInvitation from "../pages/CircleMyInvitation.vue";

const routes = [
    {path: '/', meta: {title: '主页',}, component: Index},
    {path: '/circle', meta: {title: '搭圈',}, component: Circle},
    {path: '/user', meta: {title: '我的',}, component: User},
    {path: '/user/info', meta: {title: '个人信息',}, component: UserInfo},
    {path: '/user/login', meta: {title: '',}, component: UserLogin},
    {path: '/user/edit', meta: {title: '修改信息',}, component: UserEdit},
    {path: '/search', meta: {title: '搜索用户',}, component: Search},
    {path: '/search/result', meta: {title: '搜索结果',}, component: SearchResult},
    {path: '/circle/create', meta: {title: '创建搭圈',}, component: CircleCreate},
    {path: '/circle/update', meta: {title: '更新搭圈',}, component: CircleUpdate},
    {path: '/circle/myJoin', meta: {title: '加入搭圈',}, component: CircleMyJoin},
    {path: '/circle/myCreate', meta: {title: '创建搭圈',}, component: CircleMyCreate},
    {path: '/circle/pwdInput', meta: {title: '搭圈密码',}, component: CirclePwdInput},
    {path: '/circle/invite', meta: {title: '选择搭圈',}, component: CircleInvite},
    {path: '/circle/myInvitation', meta: {title: '收到的邀请',}, component: CircleMyInvitation},
    {path: '/tag', meta: {title: '标签管理',}, component: Tag},
]

export default routes