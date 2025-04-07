import {createStore} from 'vuex'
import modules from './modules/index'

// 创建一个新的 store 实例
const store = createStore({
    modules: modules,
    mutations: {}
})

export default store; 