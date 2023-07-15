<script setup lang="ts">
import request from "../config/request";
import defaultAvatar from "../assets/cwy.jpg";
import { useRoute, useRouter } from "vue-router";
import { onMounted, Ref, ref } from "vue";
import { showFailToast } from "vant";
import  {getCurrentUser } from "../services/user";
import { UserType }  from "../models/user";

const route = useRoute();
const router = useRouter();
const userList: Ref<UserType[]> = ref([])
let currentUser : {id:0} = {};

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

<template>
    <template v-for="user in userList"  :key="user.id">
        <van-card
            :title="user.username"
            :desc="user.profile"
            :thumb="user.avatarUrl===null?defaultAvatar:user.avatarUrl"
        >
            <template #tags>
                <div style="margin-top: 10px;">
                    <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 5px">{{ tag }}</van-tag>
                </div>
            </template>
            <template #footer>
                <van-button plain size="small" type="primary"
                            :disabled="currentUser.id === user.id"
                            @click="toCircleInvite(user.id)">邀请
                </van-button>
            </template>
        </van-card>
    </template>
    <van-empty image="search" v-if="userList.length < 1" description="搜索结果为空"/>
</template>

<style scoped>
:deep(.van-image__img) {
    height: 110px;
}
</style>