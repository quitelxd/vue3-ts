import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router/index'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import "@/less/main.less"

import '@/utils/permission'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
   .use(pinia)
   .use(ElementPlus, {
     locale: zhCn,  // 使用中文
     size: 'default'  // 设置组件默认尺寸
   })
   .mount('#app')
