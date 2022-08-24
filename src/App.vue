<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import {watch} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
watch(route, () => {
  watch(() => route.meta, (n, o) => {
        console.log('监听路由')
        console.log('new:' + n + ',old:' + o)
      }
  )
})
</script>
<style lang="less">
.app {

}
</style>
