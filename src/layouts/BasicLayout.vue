<template>
  <div >
    <van-nav-bar
            fixed
            placeholder
            :title="title"
            :left-arrow="route.path!=='/'&&route.path!=='/circle'
            &&route.path!=='/user'&&route.path!=='/user/login'"
            @click-left="onClickLeft"
            @click-right="onClickRight"
    >
        <template #right>
            <van-icon name="search" v-if="route.path==='/'" size="18"/>
            <van-icon name="plus" size="18"
                      v-if="route.path==='/circle'||route.path==='/circle/myCreate'||route.path==='/circle/myJoin'"/>
        </template>
    </van-nav-bar>

    <div id="content">
        <router-view/>
    </div>
    <van-tabbar route v-if="route.path==='/'||route.path==='/circle'||route.path==='/user'">
        <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/circle" icon="friends-o">SOUl</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup >

import {useRoute, useRouter} from "vue-router";
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const title = ref('主页')

router.beforeEach((to, from, next) => {
  title.value = to.meta.title
  next()
})

const onClickLeft = () => {
  router.back();
}
const onClickRight = () => {
  if (route.path === '/') {
      router.push('/search')
  }
  if (route.path === '/circle' || route.path === '/circle/myCreate' || route.path === '/circle/myJoin') {
      router.push('/circle/create')
  }
}


</script>

<style scoped>
#content {
  padding-bottom: 60px;
}
</style>