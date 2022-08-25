/**
* create by zhangxiang on 2022-08-25 23:23
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model:show="show" position="bottom" round :lock-scroll="false" :overlay="false"
             :style="{ height: '50px' }">
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item>
        <span>目录</span>
        <template #icon>
          <i class="iconfont icon-mulu"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search">{{ bookStore.isNight ? '日间' : '夜间' }}
        <template #icon>
          <i :class="[bookStore.isNight ? 'icon-a-qingtianbaitian':' icon-yejianmoshi']" class="iconfont"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">设置
        <template #icon>
          <i class="iconfont icon-shezhi"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </van-popup>
</template>

<script setup>
import {defineExpose, reactive, toRefs, defineEmits} from 'vue'
import {useBookStore} from '@/store'

const bookStore = useBookStore()

const data = reactive({
  show: false,
  active: -1
})

const emit = defineEmits(['change'])
const {show, active} = toRefs(data)

defineExpose({
  show
})

const change = (index) => {
  data.show = false
  if (index === 1) {
    if (bookStore.isNight) {
      bookStore.setBackgroundColor('#fff')
      bookStore.setColor('#333')
      bookStore.setIsNight(false)
    } else {
      bookStore.setBackgroundColor('#333')
      bookStore.setColor('#fff')
      bookStore.setIsNight(true)
    }
  }
  emit('change', index)
  setTimeout(() => {
    data.active = -1
  }, 10)
}

</script>

<style scoped lang="less" rel="stylesheet/less">

</style>