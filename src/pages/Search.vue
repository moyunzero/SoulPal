<template>
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
    <van-divider content-position="left" v-if="activeIds.length !== 0">已选标签</van-divider>
    <van-divider content-position="left" v-if="activeIds.length === 0">请选择标签</van-divider>
  <!--标签-->
    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="activeId in activeIds" :key="activeId">
            <van-tag closeable plain size="small" type="primary" @close="close(activeId)">
                {{ activeId }}
            </van-tag>
        </van-col>
    </van-row>

  <!--分类选择-->
    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagList"
            style="height: 400px"
    />
    <van-button type="primary" round text="搜索" style="position: fixed;bottom: 30px" size="large"
                :disabled="activeIds.length < 1"
                @click="toSearchResult(activeIds)"/>
</template>

<script setup >
import {ref} from "vue";
import {useRouter} from "vue-router";
import originTagList from "../data/originTagList.js";

const router = useRouter();
let tagList = ref(originTagList);
const activeIds = ref([]);
const searchValue = ref('');
const activeIndex = ref(0);

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
const close = (activeId) => {
    activeIds.value = activeIds.value.filter(item => item !== activeId);
};
const toSearchResult = (activeIds) => {
    router.push({
        path: "/search/result",
        query: {
            tagNameList: activeIds
        }
    })
}

</script>

<style scoped>

</style>