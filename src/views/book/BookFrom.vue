/**
* create by zx on 2022/8/26 09:51
* 类注释：
* 备注：
*/
<template>
  <div class="BookFrom">
      <van-nav-bar
          :fixed="true"
          left-arrow
          :safe-area-inset-top="true"
          :placeholder="true"
          title="书源设置"
          @click-left="router.back()"
      />
      <van-cell v-for="item in bookStore.bookFormList" :key="item.value" :title="item.name" @click="cellClick(item)">
        <template #right-icon>
          <i class="iconfont" :class="[item.show?'icon-eye':'icon-eye-none']" />
        </template>
      </van-cell>
    </div>
</template>

<script setup>
import {useBookStore} from '@/store'
import {useRouter} from 'vue-router'
import {getCurrentInstance} from 'vue'

const router = useRouter()
const bookStore = useBookStore()

const globalProperties = getCurrentInstance().appContext.app.config.globalProperties


const cellClick = (item) => {
  item.show = !item.show
  bookStore.setBookFromList(bookStore.bookFormList)
  globalProperties.$toast(`查询时将 ${item.show ? '添加上' : ' 过滤掉 '} ${item.name} 书源`)
}

</script>

<style scoped>

</style>