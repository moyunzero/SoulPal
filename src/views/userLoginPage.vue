<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
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
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import myAxios from "../plugins/myAxios.js";
import { showToast } from "vant";
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userAccount = ref();
const userPassword = ref();

const onSubmit = async () => {
  // console.log("用户登录");
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  });
  if (res.code == 0 && res.data != null) {
    showToast.success("登录成功");
    router.replace("/")
  } else {
    showToast.fail("登录失败");
  }
};
onMounted(async ()=>{
 const res = await myAxios.get('/user/current');
 if (res.code === 0){
 user.value =res.data;
 Toast.success('获取用户信息成功');
 }else {
 Toast.fail('获取用户信息成功');
 }
})
</script>

<style scoped>

</style>