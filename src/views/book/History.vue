/**
* create by zx on 2022/8/26 16:48
* 类注释：
* 备注：
*/
<template>
  <div class="History">
    <van-nav-bar
        :fixed="true"
        left-arrow
        :safe-area-inset-top="true"
        :placeholder="true"
        title="我的书架"
        @click-left="router.back()"
    />
    <van-swipe-cell v-for="(item,index) in bookStore.bookHistory" :key="item.detailUrl">
      <van-cell :value="item.from">
        <template #title>
          <div class="van-ellipsis" style="width: 100%">{{ item.bookName }}</div>
        </template>
        <template #label>
          <div class="van-ellipsis" style="width: 100%">{{ item.title }}</div>
        </template>
        <template #icon>
          <van-image
              lazy-load
              error-icon="fail"
              :src="item.imgUrl?item.imgUrl:require('@/assets/img/nocover.jpg')"
              radius="3"
              width="32"
              height="40"
              style="margin-right: 10px"
          />
        </template>
      </van-cell>
      <template #right>
        <van-button style="height: 100%" square type="danger" text="删除" @click="del(index)"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {useBookStore} from '@/store'

const bookStore = useBookStore()
const router = useRouter()

const del = (index) => {
  bookStore.bookHistory.splice(index, 1)
}

</script>

<style scoped>

</style>