<script setup>
import {  ref } from 'vue';
import { useRoute } from "vue-router";
const route = useRoute();

const editUser = ref({
  editKey :route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
});

const onSubmit =(values) =>{
  //todo 将更新后的数据提交给后台（未完）
  console.log('onSubmit',values)
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