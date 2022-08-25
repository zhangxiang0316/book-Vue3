/*
import {createApp} from 'vue' // 导⼊ createApp ⽅法
import Loading from './loading' // 导⼊我们写好的 loading 组件
const loadingDirective = {
    mounted(el, binding) {
        // 创建app对象跟组件为我们写好的 loading 组件
        const app = createApp(Loading)

        console.log('-------------')
        // 动态创建⼀个div节点，将app挂载在div上
        // 我们的 loading 组件将替换此 div 标签的 innerHTML
        const instance = app.mount(document.createElement('div'))

        // 因为在updated也需要⽤到 instance 所以将 instance 添加在 el 上
        // 在 updated中 通过el.instance 可访问到
        el.instance = instance

        // v-loading传过来的值储存在 binding.value 中
        if (binding.value) {
            append(el)
        }

        // 在此判断是否有title值
        if (binding.arg !== 'undefined') {
            // setTitle 使我们在loading组件中定义的⽅法
            el.instance.setTitle(binding.arg)
        }
    },
    updated(el, binding) {
        // 在此判断是否有title值
        if (binding.arg !== 'undefined') {
            // setTitle 使我们在loading组件中定义的⽅法
            el.instance.setTitle(binding.arg)
        }

        // 如果value的值有改变，那么我们去判断进⾏操作
        if (binding.value !== binding.oldValue) {
            // 三元表达式 true 插入 false 移除
            binding.value ? append(el) : remove(el)
        }
    }
}
export default loadingDirective  // 导出

const relative = 'g-relative' // g-relative 全局相对定位样式名称
const hidden = 'g-hidden' // g-hidden 全局禁止/隐藏滚动样式名称
// 插入节点
function append(el) {
    console.log(el)
    const style = getComputedStyle(el)
    // el.classList.add(hidden) // 添加类名
    if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
        el.classList.add(relative) // 添加类名
    }
    // 向el节点插⼊动态创建的 div 节点，内容就是我们的 loading 组件
    el.appendChild(el.instance.$el)
}

// 移除节点
function remove(el) {
    // 移除动态创建的 div 节点
    el.removeChild(el.instance.$el)
    el.classList.remove(relative) // 移除类名
    el.classList.remove(hidden) // 移除类名
}
*/

import { createApp } from "vue"

import Loading from './loading.vue'

export default {
    loading: null,
    install(Vue) {
        if (this.loading) {
            // 防止多次载入
            Vue.config.globalProperties.$loading = this.loading;
            return ;
        }
        let instance = createApp(Loading);
        let parent = document.createElement("div")
        let bodyDom = document.body
        // 这里需要注意，大概率app还没有mount，导致获取不到app节点，所以想挂载到app上，需要保证app已经创建。
        bodyDom.appendChild(parent)
        this.loading = instance.mount(parent)

        Vue.config.globalProperties.$loading = this.loading;
    }
};
