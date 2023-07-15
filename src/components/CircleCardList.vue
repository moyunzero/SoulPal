<template>
  <div id="circleCardList">
    <van-card
        :key="circle.id"
        v-for="circle in props.circleList"
        :title="`${circle.name}`"
        :desc="circle.description"
        :thumb="circle.imageUrl === null ? defaultAvatar:circle.imageUrl"
      >
        <template #tags>
          <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
            {{
              CircleStatusEnum[circle.status]
            }}
          </van-tag>
        </template>
        <template #footer>
            <van-button type="primary" plain size="small" v-if="Number(circle.status) !== 1"
                        @click="doJoinCircle(circle.id, circle.status)">加入搭圈
            </van-button>
        </template>
        <template #bottom>
            搭圈人数：{{ circle.memberList.length }}/{{ circle.maxNum }} <br>
            创建时间：{{ circle.createTime }} <br>
            过期时间：{{ circle.expireTime }} <br>
        </template>
    </van-card>
  </div>
</template>


<script setup lang="ts">
import { CircleType } from "../models/circle";
import { CircleStatusEnum } from "../constants/CircleStatusEnum";
import { showConfirmDialog, showFailToast, showNotify, showSuccessToast} from "vant";
import { useRouter } from "vue-router";
import { onMounted, ref   } from "vue";
import defaultAvatar from "../assets/cat.jpg"
import request from "../config/request";

const router = useRouter();
const searchText = ref('');
const circleList = ref([])

const searchCircle = async () => {
    const res = await request.get(`/circle/list?searchText=${searchText.value}`);
    const data = res.data;
    if (data.code === 0) {
        circleList.value = res.data
    }
}
onMounted(() => {
    searchCircle();
})
const doJoinCircle = (circleId:number, status:number) => {
    // 公开房间
    if (status === 0) {
        showConfirmDialog({
            title: '加入',
            message:
                '确定加入搭圈吗？',
            theme: 'round-button',
        }).then(async () => {
            const res = await request.post(`/circle/join/`, {circleId: circleId});
            const data =res.data;
            if (data.code === 0) {
                showSuccessToast('加入成功');
                location.reload();
            } else {
                showFailToast('加入失败');
                showNotify({message: data.data.description, type: 'danger'});
            }
        }).catch(err => {
            console.error(err);
        });
    }
    // 加密房间
    if (status === 2) {
        router.push({
            path: "/circle/pwdInput",
            query: {
                circleId
            }
        })
    }

}

interface CircleCardListProps {
  circleList: CircleType[];
}

const props = withDefaults(defineProps<CircleCardListProps>(), {
  // @ts-ignore
  circleList: [] as CircleType[],
});

</script>

<style scoped>
#circleCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
