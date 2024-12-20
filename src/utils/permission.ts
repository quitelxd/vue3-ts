/**
 * @Description: 登录控制
 * @author Linxd
 * @date 2021/6/30
*/

import router from "@/router";
import { useUserStore } from '@/stores/user'

router.beforeEach(async (to, from, next)=>{
    const userStore = useUserStore()
    
    if (userStore.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})
