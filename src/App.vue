<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive :exclude="['BookDetail','MovieDetail']">
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import {watch, reactive, toRefs} from 'vue'
import {useRoute} from 'vue-router'

const data = reactive({
  transitionName: ''
})

const {transitionName} = toRefs(data)

const route = useRoute()

watch(() => route.meta, (to, from) => {
      if (to.index && from.index) {
        if (from.index <= to.index) {
          data.transitionName = 'slide-left'
        } else {
          data.transitionName = 'slide-right'
        }
      }
    }
)
</script>
<style lang="less">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.fade-in-up-big-enter-active {
  will-change: transform;
  transition: all .5s;
  position: absolute;
  height: 100vh;
  width: 100%;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.fade-in-up-big-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.fade-in-up-big-leave-active {
  transform: translate3d(0, -100%, 0);
}
</style>
