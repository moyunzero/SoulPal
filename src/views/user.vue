<script setup>
import dayjs from 'dayjs'

  const user = {
    id: 1,
    username: '墨韵',
    userAccount: 'SoulPal',
    avatarUrl: 'https://s3.bmp.ovh/imgs/2023/07/02/85910a1a47e71cbe.png',
    gender: '男',
    phone: '100100110',
    email: '110110@qq.com',
    createTime: new Date(),
  };
</script>

<template>
  <div class="container">
    <van-cell title="昵称" is-link to='/user/edit' :value="user.username"/>
    <van-cell title="账号" is-link to='/user/edit' :value="user.userAccount" />
    <van-cell title="头像" is-link to='/user/edit' center>
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link to='/user/edit' :value="user.gender" />
    <van-cell title="电话" is-link to='/user/edit' :value="user.phone" />
    <van-cell title="邮箱" is-link to='/user/edit' :value="user.email" />
    <van-cell title="注册时间" :value="dayjs(user.createTime).format('YYYY-MM-DD')" />
  </div>
</template>



<style>

</style>