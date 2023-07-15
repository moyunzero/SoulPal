<script setup lang="ts">
import request from "../config/request";
import { CircleStatusEnum } from "../constants/CircleStatusEnum";
import { showConfirmDialog, showFailToast, showNotify, showSuccessToast } from "vant";
import { CircleType }  from "../models/circle";
import { useRouter } from "vue-router";
import { onMounted, Ref, ref } from "vue";

const router = useRouter();
const searchText = ref('');
const circleList: Ref<CircleType[]> = ref([])

onMounted(() => {
    searchCircle();
})
const searchCircle = async () => {
    const res = await request.get(`/circle/my/create?name=${searchText.value}`);
    if (res.code === 0) {
        circleList.value = res.data
    }
}

/**
 * 更新搭圈
 * @param circle
 */
const doUpdate = (circle) => {
    router.push({
        path: "/circle/update/",
        query: {
            circle: JSON.stringify(circle)
        }
    })
}

/**
 * 解散搭圈
 * @param circleId
 */
const doDisband = (circleId) => {
    showConfirmDialog({
        title: '解散',
        message:
            '确定解散搭圈吗？',
        theme: 'round-button',
    }).then(async () => {
        const res = await request.delete(`/circle/disband/${circleId}`);
        if (res.code === 0) {
            showSuccessToast("解散成功！");
            location.reload();
        } else {
            showFailToast("解散失败");
            showNotify({message: res.descriptioon, type: 'danger'});
        }
    }).catch((err) => {
    });
}

/**
 * 退出搭圈
 * @param circleId
 */
const doLogout = (circleId) => {
    showConfirmDialog({
        title: '退出',
        message:
            '确定退出搭圈吗？',
        theme: 'round-button',
    }).then(async () => {
        const res = await request.delete(`/circle/quit/${circleId}`);
        if (res.code === 0) {
            showSuccessToast('退出成功');
            location.reload();
        } else {
            showFailToast('退出失败');
            showNotify({message: res.description, type: 'danger'});
        }
    });
}

</script>

<template>
    <van-search v-model="searchText" placeholder="搜索搭圈" @search="searchCircle"/>
    <template v-for="circle in circleList">
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
                <van-button type="primary" plain size="small" @click="doUpdate(circle)">更新搭圈</van-button>
                <van-button type="warning" plain size="small" @click="doDisband(circle.id)">解散搭圈</van-button>
                <van-button type="danger" plain size="small" @click="doLogout(circle.id)">退出搭圈</van-button>
            </template>
            <template #bottom>
                搭圈人数：{{ circle.memberList.length }}/{{ circle.maxNum }} <br>
                创建时间：{{ circle.createTime }} <br>
                过期时间：{{ circle.expireTime }} <br>
            </template>
        </van-card>
    </template>
    <van-empty image="search" v-if="circleList === null || circleList.length < 1" description="结果为空"/>
</template>

<style scoped>
:deep(.van-image__img) {
    height: 120px;
}
</style>