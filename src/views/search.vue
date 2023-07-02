<script setup>
import { ref } from 'vue';
// import { showToast } from 'vant';

const value = ref('');
const searchText = ref(value);
const activeIds = ref([]);
const activeIndex = ref(0);
const orignTagList = [
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

// 移除标签
const doClose = (tag) =>{
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })
}
// 搜索、删除
const tagList = ref(orignTagList);
const onSearch = ( val ) => {
  tagList.value = orignTagList.map(parentTag => {
    const temChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = temChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  }).filter(parentTag => parentTag.children.length > 0);// 添加筛选父标签的逻辑
  if (tagList.value.length === 0) {
    tagList.value.push({ text: "无该标签" }); // 在tagList中添加一个特定的对象表示找不到相应的标签
  }
};


const onCancel = () => {
  searchText.value = '';
  tagList.value = orignTagList;
};


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