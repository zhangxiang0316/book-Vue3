import {createApp} from 'vue'
import App from './App.vue'
import Vant from 'vant'
import  Http from "@/http/index";
import 'vant/lib/index.css'
import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'


import router from '@/router'

const app = createApp(App)
app.config.globalProperties.$http = Http

app.use(Vant).use(router)
app.mount('#app')
