/**
* create by zx on 2022/8/25 13:33
* 类注释：
* 备注：
*/
<template>
  <div class="BookDetail">
    <van-nav-bar
        :fixed="true"
        :safe-area-inset-top="true"
        :placeholder="true"
        :title="title"
        left-arrow
        @click-right="rightClick"
        @click-left="router.back()"
    >
      <template #right>
        <i class="iconfont icon-caidan" style="color:white;"/>
      </template>
    </van-nav-bar>
    <div
        v-show="bookDetail.detail"
        style="padding:  10px;position: relative;"
        :style="{'background-color':backgroundColor,color:color,
        'font-size':fontSize+'px','line-height':lineHeight+'px'}"
        @click="showBottomMenu">
      <van-pull-refresh v-if="bookDetail.detail" v-model="refreshing" @refresh="onRefresh">
        <van-list
            ref="detail"
            v-model="loading"
            :offset="20"
            :finished="finished"
            finished-text="没有更多了"
            @load="nextPage"
        >
          <div style="height: 20px"/>
          <div>
            <div
                v-for="(item,index) in detailList"
                :key="index"
            >
              <div v-if="item.type==='title'" style="color: #9a6e3a">{{ item.value }}</div>
              <div v-else style="text-indent:30px">{{ item }}</div>
              <div style="height: 20px"/>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <left-menu :from="from" :now-url="detailUrl" :url="menuUrl" ref='lMenu' @loadData='load'></left-menu>
    <bottom-menu ref="bMenu" @change="bottomChange"></bottom-menu>
    <detail-menu ref="dMenu"></detail-menu>
  </div>
</template>

<script setup>
import {reactive, toRefs, onMounted, getCurrentInstance, ref} from 'vue'
import {useRouter} from 'vue-router'
import LeftMenu from '@/components/book/LeftMenu'
import BottomMenu from '@/components/book/BottomMenu'
import DetailMenu from '@/components/book/DetailMenu'
import {useBookStore} from '@/store'
import Http from '@/http'
import {storeToRefs} from 'pinia'

const lMenu = ref(null)
const bMenu = ref(null)
const dMenu = ref(null)

const router = useRouter()
const bookStore = useBookStore()
const {backgroundColor, color, fontSize, lineHeight} = storeToRefs(bookStore)
const globalProperties = getCurrentInstance().appContext.config.globalProperties;
const data = reactive({
  title: '',
  menuUrl: '',
  from: '',
  bookName: "",
  bookDetail: {},
  detailList: [],
  detailUrl: '',
  refreshing: false,
  loading: false,
  finished: false
})
const {title, refreshing, bookDetail, loading, finished, detailList, from, detailUrl, menuUrl} = toRefs(data)

const rightClick = () => {
  bMenu.value.show = true
}

const bottomChange = (index) => {
  switch (index) {
    case 0:
      lMenu.value.show = true
      break
    case 2:
      dMenu.value.show = true
      break
    default:
      break
  }
}

onMounted(() => {
  data.title = bookStore.bookDetail.title
  data.from = bookStore.bookDetail.from
  data.menuUrl = bookStore.bookDetail.menuUrl
  data.detailUrl = bookStore.bookDetail.detailUrl
  data.bookName = bookStore.bookDetail.bookName
  loadData(true, true)
})

const load = (url) => {
  data.detailUrl = url
  loadData(true, true)
}

const showBottomMenu = () => {
  bMenu.value.show = !bMenu.value.show
}

const loadData = (flag, isRefresh) => {
  globalProperties.$loading.show('拼命加载中...')
  Http.get('/getBookDetail', {
    params: {
      detailUrl: data.detailUrl,
      type: data.from
    }
  }).then(res => {
    globalProperties.$loading.hide()
    data.refreshing = false
    data.loading = false
    data.bookDetail = res
    data.title = data.bookDetail.title
    if (isRefresh) {
      data.detailList = data.bookDetail.detail
      data.detailList.unshift({type: 'title', value: data.title})
      window.scrollTo(0, 0)
    } else {
      data.detailList.push({type: 'title', value: data.title})
      data.detailList.push(...data.bookDetail.detail)
    }
    const index = bookStore.bookHistory.findIndex(item => item.menuUrl === data.menuUrl)
    const obj = {
      menuUrl: data.menuUrl,
      detailUrl: data.detailUrl,
      bookName: data.bookName,
      title: data.title,
      from: data.from,
      imgUrl: data.imgUrl
    }
    if (index !== -1) {
      bookStore.bookHistory.splice(index, 1)
    }
    bookStore.bookHistory.unshift(obj)
  })
}

const onRefresh = () => {
  if (!data.bookDetail.previewUrl) {
    globalProperties.$toast('这是第一章了')
    data.refreshing = false
    return
  }
  data.detailUrl = data.bookDetail.previewUrl
  loadData(false, true)
}

const nextPage = () => {
  if (!data.bookDetail.nextUrl) {
    globalProperties.$toast('没有新章节了')
    return
  }
  data.detailUrl = data.bookDetail.nextUrl
  loadData(false, false)
}

</script>

<style scoped>

</style>