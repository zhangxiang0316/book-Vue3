/**
* create by zhangxiang on 2022-08-26 00:03
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model:show="show" position="bottom">
    <van-form label-width="40px">
      <van-field name="checkboxGroup" label="字号:" style="line-height: 30px">
        <template #input>
          <van-button style="width: 80px" round type="info" size="small" icon="plus" @click="setFontSize(1)"/>
          <van-button round type="info" size="small" style="margin-left: 20px;width: 80px" icon="minus"
                      @click="setFontSize(-1)"/>
        </template>
      </van-field>
      <van-field name="checkboxGroup" label="间距:" style="line-height: 30px">
        <template #input>
          <van-button style="width: 80px" round type="info" size="small" icon="plus" @click="setLineHeight(1)"/>
          <van-button round type="info" size="small" style="margin-left: 20px;width: 80px" icon="minus"
                      @click="setLineHeight(-1)"/>
        </template>
      </van-field>
      <van-field name="checkboxGroup" label="背景:" style="line-height: 30px">
        <template #input>
          <van-button style="width: 30px;height: 30px; background: #FAF9DE" round type="info" size="small"
                      @click="setBackColor('#FAF9DE')"/>
          <van-button round type="info" size="small"
                      style="margin-left: 14px;height: 30px;width: 30px;background: #E3EDCD"
                      @click="setBackColor('#E3EDCD')"/>
          <van-button round type="info" size="small"
                      style="margin-left: 14px;width: 30px;height: 30px;background: #BCC8BC"
                      @click="setBackColor('#BCC8BC')"/>
          <van-button round type="info" size="small"
                      style="margin-left: 14px;height: 30px;width: 30px;background: #CCE8CF"
                      @click="setBackColor('#CCE8CF')"/>
          <van-button round type="info" size="small"
                      style="margin-left: 14px;height: 30px;width: 30px;background: #CEE2E0"
                      @click="setBackColor('#CEE2E0')"/>
          <van-button round type="info" size="small"
                      style="margin-left: 14px;height: 30px;width: 30px;background: #DCE2F1"
                      @click="setBackColor('#DCE2F1')"/>
          <van-button round type="info" size="small"
                      style="margin-left: 14px;height: 30px;width: 30px;background: #E9EBFE"
                      @click="setBackColor('#E9EBFE')"/>
        </template>
      </van-field>
    </van-form>
  </van-popup>
</template>

<script setup>
import {toRefs, reactive, defineExpose} from 'vue'
import {useBookStore} from '@/store'

const bookStore = useBookStore()
const setBackColor = (val) => {
  bookStore.setBackgroundColor(val)
  bookStore.color = '#333'
  bookStore.isNight = false
}
const setLineHeight = (val) => {
  bookStore.lineHeight = bookStore.lineHeight + val
}
const setFontSize = (val) => {
  bookStore.fontSize = bookStore.fontSize + val
}

const data = reactive({
  show: false
})

const {show} = toRefs(data)

defineExpose({
  show
})


</script>

<style scoped lang="less" rel="stylesheet/less">

</style>