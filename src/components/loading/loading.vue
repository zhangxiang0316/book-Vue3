<template>
  <div class="loading" v-show="msg.show">
    <div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
      <div class="dot3"></div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps({
  msg: Object,
})
</script>

<style scoped lang="less">
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .newtons-cradle {
    --uib-size: 50px;
    --uib-speed: 1.2s;
    --uib-color: #474554;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uib-size);
    height: var(--uib-size);
  }

  .spinner {
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dot1, .dot2, .dot3 {
    width: 15px;
    height: 15px;
    border: double;
    border-color: white;
    border-radius: 50%;
    margin: 10px;
  }

  .dot1 {
    animation: jump765 1.6s -0.32s linear infinite;
    background: #2495ff;
  }

  .dot2 {
    animation: jump765 1.6s -0.16s linear infinite;
    background: #2495ff;
  }

  .dot3 {
    animation: jump765 1.6s linear infinite;
    background: #2495ff;
  }

  @keyframes jump765 {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(2.0);
      transform: scale(2.0);
    }
  }


}
</style>