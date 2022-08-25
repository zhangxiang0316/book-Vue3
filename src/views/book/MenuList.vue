/**
* create by zx on 2022/8/25 13:41
* 类注释：
* 备注：
*/
<template>
  <div class="MenuList">
    <van-nav-bar
        :fixed="true"
        :safe-area-inset-top="true"
        :placeholder="true"
        :title="title"
        left-arrow
        right-text="倒序"
        @click-right="rightClick"
        @click-left="router.back()"
    />
    <div ref="mHeader">
      <div v-if="info.name" style="padding: 10px;display: flex">
        <div style="width: 80px">
          <van-image radius="6" width="75" height="100" :src="info.imgUrl" lazy-load/>
        </div>
        <div style="line-height: 25px;margin-left: 10px">
          <div style="font-size: 20px;font-weight: 800">{{ info.name }}</div>
          <div style="font-size: 14px">{{ info.author }}</div>
          <div style="font-size: 14px">{{ info.status }}</div>
          <div style="font-size: 14px">{{ info.updataTime }}</div>
        </div>
      </div>
      <div v-if="info.name" class="van-multi-ellipsis--l3" style="padding: 0 10px;font-size: 13px;line-height: 25px">
        简介： {{ info.disc }}
      </div>
    </div>
    <div :style="{height:height}" style="overflow-y: auto;">
      <van-cell
          v-for="source in list"
          :title="source.name"
          :key="source.menuUrl"
          is-link
          border
          @click="cellClick(source)"
      >
      </van-cell>
    </div>
  </div>
</template>

<script setup>
import {reactive, toRefs, onActivated, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useBookStore} from '@/store'
import Http from '@/http'

const data = reactive({
  title: '',
  menuUrl: '',
  from: '',
  info: {},
  list: [],
  loading: true,
  height: 0
})

const {title, info, list, height} = toRefs(data)
const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()
const mHeader = ref(null)

const rightClick = () => {
  data.list = data.list.reverse()
}
const cellClick = (item) => {
  bookStore.setBookDetail({
    detailUrl: item.url,
    menuUrl: data.menuUrl,
    bookName: data.title,
    from: item.from,
    imgUrl: data.info.imgUrl
  })
  router.push({name: "BookDetail"})
}

onActivated(() => {
  if (data.menuUrl !== route.query.menuUrl) {
    data.title = route.query.name
    data.from = route.query.from
    data.menuUrl = route.query.menuUrl
    loadMenuList()
  }
})

const loadMenuList = () => {
  data.list = []
  data.info = {}
  Http.get('/getMenuList', {
    params: {
      bookUrl: data.menuUrl,
      type: data.from
    }
  }).then(res => {
    data.list = res.list
    data.info = res.info
    // globalProperties.$loading.hide()
    window.scrollTo(0, 0)
    data.height = document.documentElement.clientHeight - mHeader.value.clientHeight - 46 + 'px'
  })
}


</script>

<style scoped>

</style>