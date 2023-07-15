<script setup lang="ts">
import request from "../config/request";
import { useRouter } from "vue-router";
import { showConfirmDialog, showNotify } from "vant";

const router = useRouter();
const toLogin = () => {
    showConfirmDialog({
        title: '退出',
        message:
            '确定要退出登录吗？',
    }).then(async () => {
            const res = await request.delete('/user/logout');
            if (res.code === 0){
                showNotify({message: '退出成功', type: 'success', duration: 500, });
                router.replace('/user/login');
            }else {
                showNotify({message: res.description, type: 'danger', duration: 500, });
            }
    }).catch((err) => {console.log(err)});

}
</script>
<template>
    <van-cell icon="user-o" title="个人信息" is-link to="/user/info"/>
    <van-cell icon="bars" title="个人标签" is-link to="/tag"/>
    <van-cell icon="friends-o" title="加入の搭圈" is-link to="/circle/myJoin"/>
    <van-cell icon="friends-o" title="创建の搭圈" is-link to="/circle/myCreate"/>
    <van-cell icon="smile-comment-o" title="收到の邀请" is-link to="/circle/myInvitation"/>
    <van-button block style="margin-top: 30px" @click="toLogin">退出</van-button>

</template>
<style scoped>

</style>