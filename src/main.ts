import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'


import "@/less/main.less"

import store from "@/store/index"

import '@/utils/permission'

createApp(App).use(router).use(ElementPlus,{locale}).use(store).mount('#app')
