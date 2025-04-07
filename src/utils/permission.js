/**
 * @Description: 登录控制
 * @author Linxd
 * @date 2021/6/30
*/

import router from "@/router";
import {getToken} from "@/utils/index";

const whiteList = ['/login']
router.beforeEach(async (to, from, next)=>{
    if(getToken()){
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            next()
        }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        }
    }
}) 