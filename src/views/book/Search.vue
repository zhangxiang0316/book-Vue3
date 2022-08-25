/**
* create by zx on 2022/8/24 16:34
* 类注释：
* 备注：
*/
<template>
  <div class="Search">
    <van-nav-bar
        :fixed="true"
        :safe-area-inset-top="true"
        :placeholder="true"
        title="图书搜索"
        left-arrow
        @click-left="back"
    />
    <div style="position: fixed;top:45px;width: 100%;z-index: 10">
      <van-search
          v-model="bookName"
          shape="round"
          autofocus
          clearable
          placeholder="请输入搜索关键词"
          @search="searchBook"
      />
    </div>
    <div style="margin-top: 46px;width: 100%">
      <van-cell
          v-for="source in list"
          :title="source.name"
          :key="source.menuUrl"
          :label="`来源:${source.from}    ${source.author}`"
          is-link
          border
          @click="cellClick(source)"
      >
        <template #icon>
          <van-image
              style="margin-right: 10px"
              width="32"
              radius="3"
              height="40"
              error-icon="fail"
              :src="source.imgUrl?source.imgUrl:require('@/assets/img/nocover.jpg')"
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {reactive, toRefs} from 'vue'
import Http from '@/http'
import {useBookStore} from '@/store'
import {sortBy, filter} from 'loadsh'

const bookStore = useBookStore()
const router = useRouter()

const data = reactive({
  bookName: '',
  list: [],
  bookFromList: []
})

const {bookName, list} = toRefs(data)

const back = () => {
  router.back()
}

const cellClick = (item) => {
  router.push({name: 'MenuList', query: {menuUrl: item.menuUrl, name: item.name, from: item.from}})
}

const searchBook = () => {
  if (!data.bookName) {
    return
  }
  data.list = []
  bookStore.bookFormList.forEach(item => {
    if (item.show) {
      Http.get('/search', {
        params: {
          name: data.bookName,
          type: item.name
        }
      }).then(res => {
        data.list = sortBy(filter([...data.list, ...res], (item) => {
          return (item.name.indexOf(data.bookName) !== -1 || item.author.indexOf(data.bookName) !== -1)
        }), (item) => {
          return item.name.length
        })
      })
    }
  })
}
</script>

<style scoped>

</style>