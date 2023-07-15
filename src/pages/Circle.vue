<script setup lang="ts">
import CircleCardList from "../components/CircleCardList.vue";
import request from "../config/request";
import { Toast } from "vant";
import { onMounted, ref } from "vue";

const active = ref('public')
const searchText = ref('');

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listCircle(searchText.value, 0);
  } else {
    // 查加密
    listCircle(searchText.value, 2);
  }
}

const circleList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listCircle = async (val = '', status = 0) => {
  const res = await request.get("/circle/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    circleList.value = res.data;
  } else {
    Toast.fail('加载搭圈失败，请刷新重试');
  }
}

// 页面加载时只触发一次
onMounted( () => {
  listCircle();
})

const onSearch = (val) => {
  listCircle(val);
};

</script>

<template>
    <div id="Circle">
    <van-search v-model="searchText" placeholder="搜索搭圈" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <circle-card-list :circleList="circleList" />
    <van-empty v-if="circleList?.length < 1" description="没有搭圈"/>
  </div>
</template>

<style scoped>
:deep(.van-image__img) {
    height: 120px;
}
</style>