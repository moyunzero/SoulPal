<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-if="editUser.editName!=='gender'"
                    v-model="editUser.curVal"
                    :name="`${editUser.editName}`"
                    :label="`${editUser.lableName}`"
                    :placeholder="`请输入${editUser.lableName}`"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import request from "../config/request.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.js";

const route = useRoute();
const router = useRouter();
const editUser = ref({
    curVal: route.query.curVal,
    editName: route.query.editName,
    lableName: route.query.lableName
})
const onSubmit = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
       showFailToast("用户未登录")
    }
    const res = await request.put("/user", {[editUser.value.editName]: editUser.value.curVal, id: currentUser.id});
    if (res.code === 0) {
        showSuccessToast('修改成功');
        router.back();
    } else {
        showFailToast('修改失败')
    }
}
</script>

<style scoped>

</style>