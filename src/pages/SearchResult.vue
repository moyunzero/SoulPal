<template>
    <div>
    <div v-for="user in userList" :key="user">
        <van-card
                :title="user.username"
                :desc="user.profile"
                :thumb="user.avatarUrl===null?defaultAvatar:user.avatarUrl"
                
        >
            <template #tags>
                <div style="margin-top: 10px;">
                    <van-tag plain type="primary" v-for="tag in user.tags" :key="tag" style="margin-right: 5px">{{ tag }}</van-tag>
                </div>
            </template>
            <template #footer>
                <van-button plain size="small" type="primary"
                            :disabled="currentUser.id === user.id"
                            @click="toCircleInvite(user.id)">邀请
                </van-button>
            </template>
        </van-card>
    </div>
    <van-empty image="search" v-if="userList.length < 1" description="搜索结果为空"/>
    </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import request from "../config/request.js";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.js";
import defaultAvatar from "../assets/vue.svg";

const route = useRoute();
const router = useRouter();
const userList = ref([])
let currentUser = {};

onMounted(async () => {
    currentUser = await getCurrentUser();
    request.get(`/user/get/tags?tagNameList=${route.query.tagNameList}`)
        .then(res => {
            if (res.code === 0) {
                res.data.forEach(user => user.tags = JSON.parse(user.tags));
                userList.value = res.data;
            } else {
                showFailToast(res.message)
            }
        })
        .catch(error => {
           console.log(error.message)
        })
})

const toCircleInvite = (userId) => {
    router.push({
        path: '/circle/invite',
        query: {
            userId: userId
        }
    })
}
</script>

<style scoped>
:deep(.van-image__img) {
    height: 110px;
}
</style>