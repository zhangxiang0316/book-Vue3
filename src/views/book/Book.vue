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
      <van-loading v-show="loading" style="text-align: center;margin-top: 20px" type="spinner" color="#1989fa">加载中...
      </van-loading>
      <div v-if="detail.hot">
        <van-sidebar>
          <van-sidebar-item :title="detail.hot.name"/>
        </van-sidebar>
        <van-grid :column-num="2">
          <van-grid-item v-for="item in detail.hot.list" :key="item.bookMenuUrl">
            <div style="display: flex" @click="cellClick(item)">
              <van-image
                  width="80"
                  height="100"
                  lazy-load
                  radius="10"
                  :src="item.imgUrl"
              />
              <div style="flex: 1;max-height: 100px;margin-left: 8px">
                <div style="font-size: 15px;line-height: 25px">{{ item.name }}</div>
                <div style="font-size: 13px;line-height: 25px">{{ item.author }}</div>
                <div style="font-size: 10px;line-height: 16px" class="van-multi-ellipsis--l3">
                  {{ item.disc.trim() }}
                </div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div v-if="detail.top">
        <van-sidebar>
          <van-sidebar-item :title="detail.top.name"/>
        </van-sidebar>
        <div style="border-bottom: 1px solid #eee"/>
        <van-cell
            v-for="(item,index) in detail.top.list"
            :key="index"
            :title="`${item.name}`"
            :label="item.author"
            :value="item.type "
            @click="cellClick(item)"
        />
        <div style="border-bottom: 1px solid #eee"/>
      </div>
      <div v-if="detail.block" style="margin-top: 10px">
        <van-tabs v-model="active" swipeable>
          <van-tab v-for="(items,index) in detail.block.list" :key="index" :title="items.name">
            <template v-for="item in items.list">
              <div
                  v-if="item.imgUrl"
                  :key="item.bookMenuUrl"
                  style="display: flex;padding: 5px 10px"
                  @click="cellClick(item)"
              >
                <van-image
                    width="66"
                    height="80"
                    radius="5"
                    lazy-load
                    :src="item.imgUrl"
                />
                <div style="flex: 1;max-height: 80px;margin-left: 8px">
                  <div style="font-size: 15px;line-height: 22px">{{ item.name }}</div>
                  <div style="font-size: 14px;line-height: 22px">{{ item.author }}</div>
                  <div style="font-size: 12px;line-height: 20px" class="van-multi-ellipsis--l3">
                    {{ item.disc.trim() }}
                  </div>
                </div>
              </div>
              <van-cell
                  v-else
                  :key="item.bookMenuUrl"
                  :title="`${item.name}`"
                  :label="item.author"
                  :value="item.type "
                  @click="cellClick(item)"
              />
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import {toRefs, reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import Http from '@/http'
import {fromList} from '@/conf'
import {useBookStore} from '@/store' // 引用js，路径根据你们对应配置好的路径填写
const bookStore = useBookStore()
const router = useRouter()
const data = reactive({
  refreshing: false,
  detail: {},
  loading: false,
  active: 0
})
const {refreshing, detail, loading, active} = toRefs(data)
const loadData = () => {
  data.loading = true
  Http.get('/biquge/home').then(res => {
    data.refreshing = false
    data.loading = false
    data.detail = res
  }).catch(() => {
    data.refreshing = false
    data.loading = false
  })
}

const toSearch = () => {
  router.push({path: '/search'})
}

const cellClick = (item) => {
  router.push({name: 'MenuList', query: {menuUrl: item.menuUrl, name: item.name, from: item.from}})
}

onMounted(() => {
  bookStore.setBookFromList(fromList)
  loadData()
})

</script>

<style scoped>

</style>