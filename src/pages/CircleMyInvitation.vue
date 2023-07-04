<template>
    <template v-for="circle in circleList" :key="circle.id">
        <van-card
                :title="circle.name"
                :desc="circle.description"
                :thumb="circle.imageUrl"
        >
            <template #tags>
                <div style="margin-top: 5px;">
                    <van-tag plain type="danger">{{ CircleStatusEnum[circle.status] }}</van-tag>
                </div>
            </template>
            <template #footer>
                <van-button type="primary" plain size="small" @click="doAgree(circle.id)">同意</van-button>
                <van-button type="danger" plain size="small" @click="doIgnore(circle.id)">忽略</van-button>
            </template>
            <template #bottom>
                圈子人数：{{ circle.memberList.length }}/{{ circle.maxNum }} <br>
                创建时间：{{ circle.createTime }} <br>
                过期时间：{{ circle.expireTime }} <br>
            </template>
        </van-card>
    </template>
    <van-empty image="search" v-if="circleList === null || circleList.length < 1" description="结果为空"/>
</template>

<script setup >

import {useRouter} from "vue-router";
import {onMounted,  ref} from "vue";
import request from "../config/request.js";
import {CircleStatusEnum} from "../constants/CircleStatusEnum.js";
import {showFailToast, showNotify, showSuccessToast} from "vant";

const router = useRouter();
const circleList = ref([])


onMounted(() => {
    loadCircle();
})
/**
 * 加载收到的邀请
 */
const loadCircle = async () => {
    const res = await request.get(`/invitation/my`);
    if (res.code === 0) {
        circleList.value = res.data
    }
}

/**
 * 同意
 */
const doAgree = async (circleId) => {
    const res = await request.post(`/invitation/${circleId}`);
    if (res.code === 0) {
        showSuccessToast('加入成功');
        location.reload();
    } else {
        showFailToast('加入失败');
        showNotify({message: res.description, type: 'danger'});
    }
}
/**
 * 忽略
 */
const doIgnore = async (circleId) => {
    const res = await request.delete(`/invitation/${circleId}`);
    if (res.code === 0) {
        showSuccessToast("已忽略~");
        location.reload();
    } else {
        showFailToast("忽略失败");
        showNotify({message: res.description, type: 'danger'});
    }
}

</script>

<style scoped>
:deep(.van-image__img) {
    height: 120px;
}
</style>