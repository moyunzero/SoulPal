<script setup>
import {  ref } from 'vue';
import { useRoute,useRouter } from "vue-router";
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant';
import { getCurrentUser } from '../services/user';

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey :route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
});

const onSubmit = async () => {
  // 异步方法必须添加 await 才可以拿到数据, 否则拿到的是 promise 对象
  const currentUser = await getCurrentUser() ;
  console.log("-------UserEditPage", currentUser);
  const res = await myAxios.post("/user/update", {
    "id": currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue // 动态取值
  })
  console.log("修改用户信息", res);
  if (res.code == 0 && res.data > 0) {
    Toast.success("修改成功");
    router.replace("/user");
  } else {
    Toast.fail("修改失败");
  }
};


// 图像修改
const imgUrl = ref([
  {url:editUser.value.currentValue}
]);
console.log(imgUrl)

</script>

<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <template v-if="editUser.editKey != 'avatarUrl' ">
        <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder= ' `请输入\${ editUser.editName }`'
        />      
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" >
            提交
          </van-button>
        </div>
      </template>
      <template v-if="editUser.editKey === 'avatarUrl' ">
        <van-field name="uploader" label="修改头像">
         <template #input>
            <van-uploader v-model="imgUrl" />
        </template>
        </van-field>
      </template>
    </van-form>
  </div>
</template>


<style>

</style>