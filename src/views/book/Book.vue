/**
* create by zx on 2022/8/24 15:59
* 类注释：
* 备注：
*/
<template>
  <div class="Book">
    <van-nav-bar
        :fixed="true"
        :safe-area-inset-top="true"
        :placeholder="true"
        title="小说"
    />
    <van-pull-refresh v-model="refreshing" @refresh="loadData">
      <van-sticky :offset-top="46">
        <van-search
            shape="round"
            placeholder="请输入"
            readonly
            @click="toSearch"
        />
      </van-sticky>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import {toRefs, reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import Http from '@/http'

const router = useRouter()

const data = reactive({
  refreshing: false,
  detail: {},
  loading: ""
})

const {refreshing, detail} = toRefs(data)

const loadData = () => {
  Http.get('/biquge/home').then(res => {
    data.refreshing = false
    data.detail = res
  }).catch(() => {
    data.refreshing = false
    data.loading = false
  })
}

const toSearch = () => {
  router.push({path: '/search'})
}

onMounted(() => {
  loadData()
})

</script>

<style scoped>

</style>