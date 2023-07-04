<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="updateCircleData.name"
                    name="name"
                    label="圈子名称"
                    placeholder="圈子名称"
                    :rules="[{ required: true, message: '请填写圈子名称' }]"
            />
            <van-field
                    v-model="updateCircleData.description"
                    type="textarea"
                    autosize
                    show-word-limit
                    maxlength="50"
                    rows="=5"
                    name="description"
                    label="描述"
                    placeholder="描述"
            />
            <van-field name="file" label="图片">
                <template #input>
                    <van-uploader
                            :after-read="afterRead"
                            accept="image/*"
                    >
                        <van-image
                                width="5rem"
                                height="5rem"
                                fit="cover"
                                position="left"
                                :src="updateCircleData.imageUrl"
                        />
                    </van-uploader>
                </template>
            </van-field>
            <van-field name="maxNum" label="最大人数">
                <template #input>
                    <van-stepper v-model="updateCircleData.maxNum" min="2" max="20" theme="round" button-size="22"/>
                </template>
            </van-field>

            <van-field name="status" label="状态">
                <template #input>
                    <van-radio-group v-model="updateCircleData.status" direction="horizontal">
                        <van-radio :name="0">公开</van-radio>
                        <van-radio :name="1">私有</van-radio>
                        <van-radio :name="2">加密</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                    v-if="Number(updateCircleData.status) === 2"
                    v-model="updateCircleData.password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="请输入六位数字密码"
                    :rules="[{ pattern: /^\d{6}$/, required: true, message: '请输入六位数字密码' }]"
            />

            <van-field
                    v-model="updateCircleData.expireTime"
                    is-link
                    readonly
                    name="expireTime"
                    label="过期时间"
                    placeholder="点击选择时间"
                    @click="showPicker = true"
            />
            <van-popup :show="showPicker" position="bottom">
                <van-picker-group
                        title="过期日期"
                        :tabs="['选择日期', '选择时间']"
                        next-step-text="下一步"
                        @confirm="onConfirmDatePick"
                        @cancel="showPicker = false"
                >
                    <van-date-picker
                            v-model="pickedDate"
                            :min-date="minDate"
                    />
                    <van-time-picker v-model="pickedTime"
                                     :min-hour="minDate.getHours()"
                                     :min-minute="minDate.getMinutes()"
                                     :min-second="minDate.getSeconds()"/>
                </van-picker-group>
            </van-popup>


        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                更新
            </van-button>
        </div>
    </van-form>

</template>

<script setup >
import {onMounted, ref} from "vue";
import request from "../config/request.js";
import {showFailToast, showNotify, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const showPicker = ref(false);
const minDate = new Date();
const pickedDate = ref([])
const pickedTime = ref([])
const route = useRoute();

const initFormData = JSON.parse(route.query.circle);
const updateCircleData = ref({...initFormData});

/**
 * 选择时间
 */
const onConfirmDatePick = () => {
    pickedTime.value.push('00');
    const time = `${pickedDate.value.join('-')} ${pickedTime.value.join(':')}`
    updateCircleData.value.expireTime = time;
    showPicker.value = false;
}
/**
 * 更新
 */
const onSubmit = async () => {
    const res = await request.put("/circle", updateCircleData.value);
    if (res.code === 0) {
        showSuccessToast("更新成功");
    } else {
        showFailToast("更新失败");
        showNotify({type: 'danger', message: res.description});
    }
}

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
        updateCircleData.value.imageUrl = res.data;
        showSuccessToast("上传成功");
    } else {
        showFailToast("上传失败");
    }
}
</script>

<style scoped>
</style>