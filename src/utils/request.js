import axios from 'axios'
import {ElMessage} from 'element-plus';
import errorCode from './requestCode'

const serve = axios.create({
    baseURL: ""
})

//请求拦截
serve.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})

serve.interceptors.response.use(res => {
    const url = res.config.url;
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code == 401) {
        ElMessage({
            message: '登录状态已过期，请重新登录！',
            type: 'error'
        })
        //登出
    } else if (code == 500) {
        ElMessage({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(code + '-' + url))
    } else if (code != 200) {
        ElMessage({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(code + '-' + url))
    } else {
        return res.data
    }
},error => {
    return Promise.reject(error)
})

export default serve 