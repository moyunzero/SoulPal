<script setup lang="ts">
import request from "../config/request";
import defaultAvatar from "../assets/cwy.jpg"
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../services/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userList = ref([])
const pageNum = ref(1);
const pageSize = ref(100);
const matchMode = ref(false);
const showMatchDialog = ref(false);
const checked = ref(0);
let currentUser;


onMounted(async () => {
    currentUser = await getCurrentUser();
    await loadUserList();
})

const loadUserList = async () => {
    if (!matchMode.value) {
        const res = await request.get(`/user/recommend?pageNum=${pageNum.value}&pageSize=${pageSize.value}`);
        if (res.code === 0) {
            res.data.records.forEach(user => {
                user.tags = JSON.parse(user.tags);
            })
            userList.value = res.data.records;
        }
    } else {
        const res = await request.get(`/user/match/${checked.value}`);
        if (res.code === 0) {
            res.data.forEach(user => {
                user.tags = JSON.parse(user.tags);
            })
            userList.value = res.data;
        }
    }

}
const changeMode = () => {
    if (matchMode.value) {
        showMatchDialog.value = true;
    } else {
        loadUserList();
    }
}
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
    <van-cell center icon="friends" title="寻找搭友">
        <template #right-icon>
            <van-switch v-model="matchMode" @click="changeMode"/>
        </template>
    </van-cell>
    <van-dialog show-cancel-button title="选择个数"
                v-model:show="showMatchDialog"
                @cancel="matchMode=!matchMode"
                @confirm="loadUserList">
        <div style="display: flex;justify-content: space-evenly;margin-top: 15px">
            <van-button :plain="checked!==3" round type="primary" @click="checked=3">3</van-button>
            <van-button :plain="checked!==5" round type="primary" @click="checked=5">5</van-button>
            <van-button :plain="checked!==8" round type="primary" @click="checked=8">8</van-button>
        </div>
    </van-dialog>

    <template v-for="user in userList">
        <van-card
                :title="user.username"
                :desc="user.profile"
                :thumb="user.avatarUrl===null?defaultAvatar:user.avatarUrl"
        >
            <template #tags>
                <div style="margin-top: 10px;">
                    <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 5px">{{ tag }}</van-tag>
                </div>
            </template>
            <template #footer>
                <van-button type="primary" plain size="small" :disabled="currentUser.id === user.id"
                            @click="toCircleInvite(user.id)">邀请
                </van-button>
            </template>
        </van-card>
    </template>
    <van-empty image="search" v-if="userList === null ||userList.length < 1" description="结果为空"/>
</template>

<style scoped>
:deep(.van-image__img) {
    height: 110px;
}
</style>