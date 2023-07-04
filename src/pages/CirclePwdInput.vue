<template>
    <div>
  <!-- 密码输入框 -->
    <van-password-input
            style="margin-top: 90px"
            :value="password"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
            info="请输入6位密码"
            :error-info="errorInfo"
    />
  <!-- 数字键盘 -->
    <van-number-keyboard
            v-model="password"
            :show="showKeyboard"
            @blur="showKeyboard = false"
    />
    </div>
</template>

<script setup >
import {ref, watch} from "vue";
import request from "../config/request.js";
import {useRoute, useRouter} from "vue-router";
import {showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();
const circleId = route.query.circleId;
const showKeyboard = ref(true);
const password = ref('');
const errorInfo = ref('');


watch(password, async (newVal) => {
    if (newVal.length === 6) {
        const res = await request.post('/circle/join',{circleId, password: newVal});
        if (res.code === 0){
            showSuccessToast("加入成功");
            router.replace('/circle');
        }else {
            errorInfo.value = res.description;
        }

    } else {
        errorInfo.value = '';
    }
});

</script>

<style scoped>

</style>