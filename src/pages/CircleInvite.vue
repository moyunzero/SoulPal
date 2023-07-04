<template>
    <div>
    <van-radio-group style="margin-top: 10px;" v-model="checked" v-for="circle in myCircleList" :key="circle.id">
        <van-cell-group v-if="circle.memberList.length !== circle.maxNum" inset>
            <van-cell :title="circle.name" clickable @click="checked=circle.id">
                <template #right-icon>
                    <van-radio :name="circle.id"/>
                </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>
    <div style="margin-top: 20px;">
        <van-button round block type="primary" :disabled="checked === 0" @click="doInvite">
            邀请
        </van-button>
    </div>  
    </div>
</template>

<script setup >
import {useRoute, useRouter} from "vue-router";
import request from "../config/request.js";
import {onMounted, ref} from "vue";
import {showFailToast, showNotify, showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();
const userId = route.query.userId;
const myCircleList = ref([]);
const checked = ref(0);

onMounted(() => {
    loadCircle();
})
/**
 * 加载圈子信息
 */
const loadCircle = async () => {
    const res = await request.get('/circle/my/create');
    if (res.code === 0) {
        myCircleList.value = res.data;
    } else {
        showFailToast('加载圈子失败');
        showNotify({message: res.description, type: 'danger'});
    }
}
/**
 * 邀请
 */
const doInvite = async () => {
    const res = await request.post('/invitation',{
        userId: userId,
        circleId: checked.value
    });
    if (res.code === 0){
        showSuccessToast("邀请成功");
        router.push('/')
    }else {
        showFailToast("邀请失败");
        showNotify({message: res.description, type: 'danger'});
    }
}

</script>

<style scoped>

</style>