<template>
    <van-tabs v-model:active="activeTab">
        <van-tab title="登录">
            <van-form @submit="onSubmit">
                <van-space direction="vertical" fill :size="20" style="margin-top: 20px;">
                    <div style="display: flex;">
                        <van-image
                                style="margin: auto"
                                round
                                width="9rem"
                                height="9rem"
                                :src="user"
                        />
                    </div>
                    <van-cell-group inset>
                        <van-field
                                v-model="userAccount"
                                name="userAccount"
                                label="账号"
                                placeholder="请输入账号"
                                :rules="[{ required: true, message: '请填写账号' }]"
                        />
                        <van-field
                                v-model="userPassword"
                                type="password"
                                name="userPassword"
                                label="密码"
                                placeholder="请输入密码"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            登录
                        </van-button>
                    </div>
                </van-space>
            </van-form>
        </van-tab>
        <van-tab title="注册">
            <van-form @submit="onSubmit2">
                <van-space direction="vertical" fill :size="20" style="margin-top: 20px;">
                    <div style="display: flex;">
                        <van-image
                                style="margin: auto"
                                round
                                width="9rem"
                                height="9rem"
                                :src="user"
                        />
                    </div>
                    <van-cell-group inset>
                        <van-field
                                v-model="userAccount2"
                                name="userAccount"
                                label="账号"
                                placeholder="请输入账号"
                                :rules="[{ required: true, message: '请填写账号' }]"
                        />
                        <van-field
                                v-model="userPassword2"
                                type="password"
                                name="userPassword"
                                label="密码"
                                placeholder="请输入密码"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                                v-model="checkPassword"
                                type="password"
                                name="checkPassword"
                                label="确认密码"
                                placeholder="请输入确认密码"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            注册
                        </van-button>
                    </div>
                </van-space>
            </van-form>
        </van-tab>
    </van-tabs>

</template>

<script setup >
import {ref} from "vue";
import request from "../config/request.js";
import {useRouter} from "vue-router";
import {showFailToast, showNotify} from "vant";
import {setUserState} from "../states/user.js";
import user from "../assets/vue.svg"

const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const userAccount2 = ref('');
const userPassword2 = ref('');
const checkPassword = ref('');
const activeTab = ref(0)
/**
 * 登录
 */
const onSubmit = async () => {
    const res = await request.post("/user/login", {
        userAccount: userAccount.value,
        userPassword: userPassword.value
    })
    if (res.code === 0) {
        setUserState(res.data);
        router.push('/');
    } else {
        showFailToast("登陆失败");
        showNotify({message: res.description, type: 'danger'});
    }
}
/**
 * 注册
 */
const onSubmit2 = async () => {
    const res = await request.post("/user/register", {
        userAccount: userAccount2.value,
        userPassword: userPassword2.value,
        checkPassword: checkPassword.value,
    })
    if (res.code === 0) {
        setUserState(res.data);
        router.push('/');
    } else {
        showFailToast("注册失败");
        showNotify({message: res.description, type: 'danger'});
    }
}
</script>

<style scoped>

</style>