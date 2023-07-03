<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const { tags } = route.query;

const mockUser = ref({
  id:1,
  userName: '墨韵',
  userAccount: 'SoulPal',
  profile: '个人简介？前端开发，加油加油加油！！！！！',
  gender: '男',
  phone: '110110',
  email: '110110@qq.com',
  avatar: 'https://s3.bmp.ovh/imgs/2023/07/02/85910a1a47e71cbe.png',
  createTime: new Date().toDateString(),
  tags: ['男', '大四']
})

</script>

<template>
  <van-card 
    :desc = "mockUser.profile"
    :title = "`${mockUser.userName}`"
    :thumb="mockUser.avatar"
  >
  <template #tags>
      <van-tag plain type="danger" v-for="tag in mockUser.tags" :key="tag" style ="margin-right:8px;margin-top:8px">
        {{tag}}
      </van-tag>
  </template>
  <template #footer>
    <van-button size="mini">联系我</van-button>
  </template>
  </van-card>
</template>

<style scoped>

</style>