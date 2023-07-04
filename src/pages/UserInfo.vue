<template>
    <div>
    <template v-if="user">
        <van-cell title="昵称" is-link :value="user.username" @click="showEditUsername=true"/>
        <van-cell title="账号" :value="user.userAccount"/>
        <van-cell title="头像" is-link>
            <van-uploader
                    :after-read="afterRead"
                    accept="image/*"
            >
                <van-image
                        width="5rem"
                        height="5rem"
                        fit="cover"
                        position="left"
                        :src="user.avatarUrl"
                />
            </van-uploader>
        </van-cell>
        <van-cell title="性别" is-link :value="user.gender===null?'':UserGenderEnum[user.gender]"
                  @click="showEditGender=true"/>
        <van-cell title="邮箱" is-link :value="user.email" @click="showEditEmail=true"/>
        <van-cell title="简介" is-link :value="user.profile" @click="showEditProfile=true"/>
        <van-cell title="手机号" is-link :value="user.phone" @click="showEditPhone=true"/>
        <van-cell title="注册时间" :value="String(user.createTime)"/>
    </template>
    <template v-if="!user">
        <van-empty image="error" description="加载失败"/>
    </template>
    <van-dialog title="修改性别" show-cancel-button
                :show="showEditGender"
                @cancel="user.gender=originUser.gender"
                @confirm="confirmEdit('gender')">
        <div style="display: flex;justify-content: space-around;margin: 20px">
            <van-radio-group direction="horizontal" v-model="user.gender">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="0" style="margin-left: 20px">女</van-radio>
            </van-radio-group>
        </div>
    </van-dialog>
    <van-dialog title="修改昵称" show-cancel-button
                :show="showEditUsername"
                @cancel="user.username=originUser.username"
                @confirm="confirmEdit('username')">
        <van-field type="text" v-model="user.username" input-align="center"/>
    </van-dialog>
    <van-dialog title="修改邮箱" show-cancel-button
                :show="showEditEmail"
                @cancel="user.email=originUser.email"
                @confirm="confirmEdit('email')">
        <van-field type="email" v-model="user.email" input-align="center"/>
    </van-dialog>
    <van-dialog title="修改简介" show-cancel-button
                :show="showEditProfile"
                @cancel="user.profile=originUser.profile;"
                @confirm="confirmEdit('profile')">
        <van-field
                v-model="user.profile"
                rows="3"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入简介"
                show-word-limit
        />
    </van-dialog>
    <van-dialog title="修改手机号" show-cancel-button
                :show="showEditPhone"
                @cancel="user.phone=originUser.phone"
                @confirm="confirmEdit('phone')">
        <van-field type="tel" v-model="user.phone" input-align="center"/>
    </van-dialog>
    </div>
</template>

<script setup >
import {useRouter} from "vue-router";
import {onMounted,  ref} from "vue";
import {getCurrentUser} from "../services/user";
import request from "../config/request.js";
import {showFailToast, showNotify, showSuccessToast} from "vant";
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import {UserGenderEnum} from "../constants/UserGenderEnum.js";

const user= ref({})
const router = useRouter();
const showEditGender = ref(false);
const showEditUsername = ref(false);
const showEditEmail = ref(false);
const showEditProfile = ref(false);
const showEditPhone = ref(false);
let originUser = {};

onMounted(async () => {
    user.value = await getCurrentUser();
    originUser = {...user.value};
})

/**
 * 上传文件
 */
const afterRead = async (file) => {
    const formData = new FormData();
    formData.append('file', file.file);
    const res = await request.post('/file/upload', formData,
        {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    if (res.code === 0) {
        user.value.avatarUrl = res.data;
        const updateRes = await request.put("/user", {
            avatarUrl: res.data,
            id: user.value.id
        });
        if (updateRes.code === 0) {
            showSuccessToast("上传成功")
        } else {
            showFailToast("上传失败")
        }
    } else {
        showFailToast("上传失败")
    }
}

/**
 * 修改性别
 */
const confirmEdit = async (name) => {
    if (name === 'gender' || name === 'username') {
        await edit(name);
    } else {
        if (verify(name)) {
            await edit(name);
        } else {
            user.value[name] = originUser[name];
        }
    }
}

/**
 * 校验数据
 */
const verify = (name) => {
    switch (name) {
        case "email":
            if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(user.value.email)) {
                showNotify({message: '邮箱地址格式不合法', type: 'danger', position: "top"})
                return false;
            } else {
                return true;
            }
            break;
        case "profile":
            if (!/^.{0,50}$/.test(user.value.profile)) {
                showNotify({message: '个人简介长度不能超过 50 个字符', type: 'danger', position: "top"})
                return false;
            } else {
                return true;
            }
            break;
        case "phone":
            if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(user.value.phone)) {
                showNotify({message: '手机号码格式不正确', type: 'danger', position: "top"})
                return false;
            } else {
                return true;
            }
        default:
            return false;
            break;
    }
}

/**
 * 修改
 */
const edit = async (name) => {
    const res = await request.put("/user", {[name]: user.value[name], id: user.value.id});
    if (res.code === 0) {
        showSuccessToast('修改成功');
    } else {
        showFailToast('修改失败')
        showNotify({message: res.description, type: 'danger'});
    }
}

</script>

<style scoped>

</style>