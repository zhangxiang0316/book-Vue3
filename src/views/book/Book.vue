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
      <div v-if="bookStore.bookHistory.length">
        <van-sidebar>
          <van-sidebar-item title="我的书架"/>
        </van-sidebar>
        <div style="border-bottom: 1px solid #eee"/>
        <div class="recommand-wrap">
          <div ref="wrapper">
            <ul ref="cont" class="cont">
              <li
                  v-for="item of bookStore.bookHistory"
                  :key="item.detailUrl"
                  class="cont-item"
                  @click="toDetail(item)"
              >
                <div class="cont-img">
                  <van-image
                      width="80"
                      height="100"
                      radius="10"
                      class="img"
                      :src="item.imgUrl?item.imgUrl:require('@/assets/img/nocover.jpg')"
                  />
                  <div class="from">{{ item.from }}</div>
                </div>
                <div class="cont-dest van-ellipsis">{{ item.bookName }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
import {toRefs, reactive, onMounted, onActivated, ref} from 'vue'
import {useRouter} from 'vue-router'
import Http from '@/http'
import {uniqBy} from 'loadsh'
import {fromList} from '@/conf'
import {useBookStore} from '@/store' // 引用js，路径根据你们对应配置好的路径填写
import BScroll from 'better-scroll'


const cont = ref(null)
const wrapper = ref(null)
const bookStore = useBookStore()
const router = useRouter()
const data = reactive({
  refreshing: false,
  detail: {},
  loading: false,
  active: 0,
  scroll: null
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

const toDetail = (item) => {
  bookStore.setBookDetail({
    detailUrl: item.detailUrl,
    menuUrl: item.menuUrl,
    bookName: item.bookName,
    from: item.from,
    imgUrl: item.imgUrl
  })
  router.push({
    name: 'BookDetail'
  })
}

const verScroll = () => {
  if (bookStore.bookHistory.length === 0) {
    return
  }
  const width = bookStore.bookHistory.length * 100 + 20// 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
  cont.value.style.width = width + 'px' // 修改滚动区域的宽度
  if (!data.scroll) {
    data.scroll = new BScroll(wrapper.value, {
      startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
      click: true,
      scrollX: true,
      scrollY: false,
      eventPassthrough: 'vertical'
    })
  } else {
    data.scroll.refresh() // 如果dom结构发生改变调用该方法
  }
}

const toSearch = () => {
  router.push({path: '/search'})
}

const cellClick = (item) => {
  router.push({name: 'MenuList', query: {menuUrl: item.menuUrl, name: item.name, from: item.from}})
}

onMounted(() => {
  const list = uniqBy([...bookStore.bookFormList, ...fromList], 'value')
  bookStore.setBookFromList(list)
  loadData()
})

onActivated(() => {
  const timer = setTimeout(() => { // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
    if (timer) {
      clearTimeout(timer)
      verScroll()
    }
  }, 0)
})

</script>

<style scoped lang="less" rel="stylesheet/less">
.input {
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid #ccc;
}

.van-tag {
  padding: 5px 10px;
  margin: 10px 10px 0 10px;
}

.van-sidebar-item {
  padding: 10px 12px;
}

.recommand-wrap {
  height: 130px;
  margin-top: 10px;
  padding-bottom: 130px;
  background: #fff;
  width: 100%;

  .cont {
    list-style: none;
    white-space: nowrap;
    font-size: 12px;

    .cont-item {
      position: relative;
      display: inline-block;
      width: 80px;
      margin-left: 20px;

      .cont-img {
        position: relative;
        overflow: hidden;
        width: 80px;
        height: 100px;
        padding-bottom: 100%;

        .img {
          width: 100%;
        }

        .from {
          position: absolute; /*绝对定位*/
          height: 20px;
          line-height: 20px;
          text-align: center;
          width: 80px;
          background-color: #FF5722;
          color: #fff;
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          left: -18px;
          top: 9px;
        }
      }

      .cont-dest {
        text-align: center;
        width: 80px;
        margin: 10px 0;
      }
    }
  }
}

/deep/ .van-grid-item__content--center {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: start;
}

/deep/ .van-cell__title {
  flex: 3;
}

/deep/ .van-cell__value {
  width: 80px;
  flex: none;
}

</style>