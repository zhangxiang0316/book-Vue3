/**
* create by zx on 2022/8/25 16:37
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model:show="show" position="left" :style="{width:'80%'}" style="margin-top: 46px">
    <van-cell
        v-for="source in list"
        :title="source.name"
        :key="source.menuUrl"
        is-link
        border
        @click="cellClick(source)"
    />
  </van-popup>
</template>

<script setup>
import {defineProps, watch, reactive, toRefs, onMounted, defineExpose, defineEmits} from 'vue'
import Http from '@/http'

const emit = defineEmits(['loadData'])

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  from: {
    type: String,
    default: ''
  },
  nowUrl: {
    type: String,
    default: ''
  }
})

const data = reactive({
  show: false,
  selectIndex: '',
  list: []
})
const {show, selectIndex, list} = toRefs(data)

defineExpose({
  show
})

watch(show, (val) => {
  if (val) {
    loadData()
  }
})

const cellClick = (item) => {
  emit('loadData', item.url)
  data.show = false
}


onMounted(() => {
  setTimeout(() => {
    loadData()
  })
})

const loadData = () => {
  if (data.list.length) {
    data.selectIndex = data.list.findIndex(item => item.url === props.nowUrl)
    return
  }
  Http.get('/getMenuList', {
    params: {
      bookUrl: props.url,
      type: props.from
    }
  }).then(res => {
    data.list = res.list
    data.selectIndex = data.list.findIndex(item => item.url === data.nowUrl)
  })
}

</script>

<style scoped>

</style>