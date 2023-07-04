<template>
    <van-search v-model="searchText" placeholder="搜索圈子" @search="searchCircle"/>
    <template v-for="circle in circleList">
        <van-card
                :title="circle.name"
                :desc="circle.description"
                :thumb="circle.imageUrl"
                :key="circle.name"
                v-if="!circle.hasJoin && circle.status !== 1"
        >
            <template #tags>
                <div style="margin-top: 5px;">
                    <van-tag plain type="danger">{{ CircleStatusEnum[circle.status] }}</van-tag>
                </div>
            </template>
            <template #footer>
                <van-button type="primary" plain size="small" v-if="Number(circle.status) !== 1"
                            @click="doJoinCircle(circle.id, circle.status)">加入圈子
                </van-button>
            </template>
            <template #bottom>
                圈子人数：{{circle.memberList.length}}/{{ circle.maxNum }} <br>
                创建时间：{{ circle.createTime }} <br>
                过期时间：{{ circle.expireTime }} <br>
            </template>
        </van-card>
    </template>
    <van-empty image="search" v-if="circleList.length < 1" description="结果为空"/>
</template>

<script setup>

import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import request from "../config/request.js";
import { CircleStatusEnum } from "../constants/CircleStatusEnum.js";
import { showConfirmDialog, showFailToast, showNotify, showSuccessToast } from "vant";

const router = useRouter();
const searchText = ref('');
const circleList = ref([])


onMounted(() => {
    searchCircle();
})
const searchCircle = async () => {
    const res = await request.get(`/circle/list?searchText=${searchText.value}`);
    if (res.code === 0) {
        circleList.value = res.data
    }
}

const doJoinCircle = (circleId, status) => {
    // 公开房间
    if (status === 0) {
        showConfirmDialog({
            title: '加入',
            message:
                '确定加入圈子吗？',
            theme: 'round-button',
        }).then(async () => {
            const res = await request.post(`/circle/join/`, {circleId: circleId});
            if (res.code === 0) {
                showSuccessToast('加入成功');
                location.reload();
            } else {
                showFailToast('加入失败');
                showNotify({message: res.description, type: 'danger'});
            }
        }).catch(err => {
        });
    }
    // 加密房间
    if (status === 2) {
        router.push({
            path: "/circle/pwdInput",
            query: {
                circleId
            }
        })
    }

}

</script>

<style scoped>
:deep(.van-image__img) {
    height: 120px;
}
</style>