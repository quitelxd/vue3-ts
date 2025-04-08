import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

import "@/less/main.less"
import "public/iconfont/iconfont.css"

import store from "@/store/index"

import '@/utils/permission'

createApp(App)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(store)
  .mount('#app') 