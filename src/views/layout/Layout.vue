/**
* create by zx on 2022/8/24 15:55
* 类注释：
* 备注：
*/
<template>
  <div class="Layout">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <van-tabbar v-model="active" route active-color="#91DCD9" placeholder>
      <van-tabbar-item replace to="/book">
        <template #icon>
          <i class="iconfont icon-shouye"/>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/audio">
        <template #icon>
          <i class="iconfont icon-touting"/>
        </template>
        听书
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <template #icon>
          <i class="iconfont icon-wode"/>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import {toRefs, reactive} from 'vue'

const {active} = toRefs(reactive({
  active: 0
}))

</script>

<style scoped lang="less">

</style>