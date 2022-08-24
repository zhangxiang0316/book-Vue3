<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <button @click="change">修改</button>
    <h1>{{ aaa }}</h1>
  </div>
</template>

<script setup>
import { defineProps, reactive, toRefs } from 'vue'

defineProps({
  msg: {
    type: String,
    default: ''
  }
})

const data = reactive({
  aaa: 'fsdfs333333df'
})

const change = () => {
  data.aaa = 'bbb3333bbb'
}

const { aaa } = toRefs(data)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
