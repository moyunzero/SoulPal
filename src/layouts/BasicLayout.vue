<script setup>
import { ref } from 'vue';
// import { showToast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();
const onClickLeft = () => {
  router.push('./');
}
const onClickRight = () => {
  router.push('/search');
}

</script>

<template>
  <main>

    <!-- 导航栏 -->
    
    <van-nav-bar title="Soul Pal" left-text="返回" left-arrow  @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" @click="onClickRight" />
      </template>
    </van-nav-bar>

    <div class="content">
      <router-view />
    </div>
    <!-- table切换栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/"  icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/square"  icon="search">广场</van-tabbar-item>
      <van-tabbar-item to="/chat"  icon="friends-o">聊天</van-tabbar-item>
      <van-tabbar-item to="/user"  icon="setting-o">自己</van-tabbar-item>
    </van-tabbar>

  </main>

</template>

<style scoped>

</style>>