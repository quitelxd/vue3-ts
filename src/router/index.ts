import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Layout from "@/views/Layout.vue";

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component:  () => import(/* webpackChunkName: "dashboard" */ '@/views/Login.vue'),
        name: 'Login',
    },
    {
        path: "/",
        component: Layout,
        redirect: '/dashboard',
        meta: {
            name: "首页"
        },
        children: [
            {
                path: '/dashboard',
                component: ()=> import('@/views/dashboard/Index.vue'),
                name: 'Dashboard',
                meta: {
                    name: "图表"
                },
            },
            {
                path: "/echarts",
                component: ()=> import('@/views/echarts/Echarts.vue'),
                meta: {
                    name: "echarts"
                }
            },
            {
                path: "/table",
                component: ()=> import('@/views/table/Index.vue'),
                meta: {
                    name: "表格"
                },
                children: [
                    {
                        path: 'elementTable',
                        component: ()=> import('@/views/table/Table.vue'),
                        meta: {
                            name: "饿了么table"
                        },
                    },
                    {
                        path: 'easyTable',
                        component: ()=> import('@/views/table/EasyTable.vue'),
                        meta: {
                            name: "EasyTable"
                        },
                    }
                ]
            },
        ]
    },


    // {
    //   path: '/dashboard',
    //   component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
    //   name: 'Dashboard',
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});

export default router
