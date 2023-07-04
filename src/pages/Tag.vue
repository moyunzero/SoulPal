<template>
    <div>
  <!--搜索-->
    <form action="/">
        <van-search
                v-model="searchValue"
                show-action
                placeholder="请输入标签关键词"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>
    <van-divider content-position="left" v-if="activeIds.length !== 0">我的标签</van-divider>
    <van-divider content-position="left" v-if="activeIds.length === 0">请选择标签</van-divider>
  <!--标签-->
    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="activeId in activeIds" :key="activeId">
            <van-tag closeable plain size="small"  type="primary" @close="close(activeId)">
                {{ activeId }}
            </van-tag>
        </van-col>
    </van-row>

  <!--分类选择-->
    <van-tree-select
            :active-id="activeIds"
            :main-active-index="activeIndex"
            :items="tagList"
            style="height: 400px"
    />
    <van-button type="primary" round text="修改" size="large" style="position: fixed;bottom: 30px"
                :disabled="activeIds.length < 1"
                @click="updateTag(activeIds)"/>

    </div>
</template>

<script setup >
import {onMounted, ref} from "vue";
import request from "../config/request.js";
import originTagList from "../data/originTagList.js";
import {showFailToast, showNotify, showSuccessToast} from "vant";

const searchValue = ref('');
const tagList = ref(originTagList)
const activeIds = ref([])
const activeIndex = ref(0)
let currentUser = {}
const onSearch = (searchValue) => {
    const tempTagList = originTagList.map(tag => {
        const tempTag = {...tag};
        const tempChildren = [...tag.children];
        tempTag.children = tempChildren.filter(children => children.id.includes(searchValue));
        return tempTag;
    }).filter(tag => tag.children.length > 0)
    tagList.value = tempTagList;
};
const onCancel = () => {
    tagList.value = originTagList;
};

// 渲染用户tag
onMounted(async () => {
    const res = await request.get('/user/current');
    if (res.code === 0) {
        if (res.data.tags === null) {
            res.data.tags = JSON.stringify([]);
        }
        activeIds.value = JSON.parse(res.data.tags);
        currentUser = res.data;
    }
})
const close = (activeId) => {
    activeIds.value = activeIds.value.filter(item => item !== activeId);
};
const updateTag = async (activeIds) => {
    const res = await request.put('/user', {
        id: currentUser.id,
        tags: JSON.stringify(activeIds)
    });
    if (res.code === 0){
        showSuccessToast("修改成功");
    }else {
        showFailToast("修改失败");
        showNotify({message: res.description, type: 'danger'});
    }
}
</script>

<style scoped>

</style>