<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';


const value = ref('');
const onSearch = (val) => showToast(val);
const onCancel = () => showToast('取消');

const activeIds = ref([]);
const activeIndex = ref(0);
const tagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
];

//移除标签
const doClose = (tag) =>{
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })
}

</script>

<template>
  <div class="container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form> 
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length == 0">请选择标签</div>
    <van-row gutter="16" >
      <div v-for="tag in activeIds" :key="tag" style="padding: 0 5px">
        <van-tag closeable size="small" type="primary" @close="doClose(tag)">
         {{tag}}
       </van-tag>
      </div>
    </van-row>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  </div>
</template>


<style>

</style>