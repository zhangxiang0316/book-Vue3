import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router'

import Vant, {Lazyload} from 'vant'
import Http from "@/http/index";
import 'vant/lib/index.css'
import '@/assets/css/reset.css'
import store from "@/store";
import '@/assets/iconfont/iconfont.css'

const app = createApp(App)
app.config.globalProperties.$http = Http

app
    .use(Vant)
    .use(store)
    // .directive('loading', loading)  // 全局注册loading指令
    // .use(loading)
    .use(Lazyload)
    .use(router)
app.mount('#app')
