<script setup>
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';

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

const router = useRouter();
const toEdit = (editKey, editName,currentValue) =>{
  router.push({
    name:'userEdit',
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<template>
  <div class="container">
    <van-cell title="账号" :value="user.userAccount" />    
    <van-cell title="昵称" is-link to='/user/edit' :value="user.username"
      @click="toEdit('username','昵称',user.username)"
    />
    <!-- 头像修改未完成 -->
    <van-cell title="头像" is-link to='/user/edit' center  @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <van-image
        round
        width="100"
        height="100"
        :src="user.avatarUrl"
      />
    </van-cell>

    <van-cell title="性别" is-link to='/user/edit' :value="user.gender" 
      @click="toEdit('usergender','性别',user.gender)"
    />

    <van-cell title="电话" is-link to='/user/edit' :value="user.phone" 
      @click="toEdit('userphone','电话',user.phone)"  
    />
    <van-cell title="邮箱" is-link to='/user/edit' :value="user.email" 
      @click="toEdit('useremail','邮箱',user.email)"
    />
    <van-cell title="注册时间" :value="dayjs(user.createTime).format('YYYY-MM-DD')" />
  </div>
</template>

<style>

</style>