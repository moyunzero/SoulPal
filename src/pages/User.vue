<template>
    <van-cell icon="user-o" title="个人信息" is-link to="/user/info"/>
    <van-cell icon="bars" title="标签管理" is-link to="/tag"/>
    <van-cell icon="friends-o" title="我加入的圈子" is-link to="/circle/myJoin"/>
    <van-cell icon="friends-o" title="我创建的圈子" is-link to="/circle/myCreate"/>
    <van-cell icon="smile-comment-o" title="我收到的邀请" is-link to="/circle/myInvitation"/>
    <van-button block style="margin-top: 30px" @click="toLogin">退出</van-button>

</template>

<script setup >
import {useRouter} from "vue-router";
import {showConfirmDialog, showNotify} from "vant";
import request from "../config/request.js";

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
    }).catch((err) => {});

}
</script>

<style scoped>

</style>