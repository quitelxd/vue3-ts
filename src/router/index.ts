import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Layout from "@/views/Layout.vue";

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Login.vue'),
        name: 'Login',
    },
    {
        path: "/",
        component: Layout,
        redirect: '/introduce',
        meta: {
            name: "首页"
        },
        children: [
            {
                path: '/introduce',
                component: () => import('@/views/introduce/Index.vue'),
                name: 'Introduce',
                meta: {
                    name: "简介"
                },
            },
            {
                path: "/echarts",
                component: () => import('@/views/echarts/Echarts.vue'),
                meta: {
                    name: "echarts"
                }
            },
            {
                path: "/table",
                component: () => import('@/views/table/Index.vue'),
                meta: {
                    name: "表格"
                },
                children: [
                    {
                        path: 'elementTable',
                        component: () => import('@/views/table/Table.vue'),
                        meta: {
                            name: "饿了么table"
                        },
                    },
                    {
                        path: 'easyTable',
                        component: () => import('@/views/table/EasyTable.vue'),
                        meta: {
                            name: "EasyTable"
                        },
                    }
                ]
            },
            {
                path: "/map",
                component: () => import('@/views/map/Index.vue'),
                meta: {
                    name: "地图"
                },
                children: [
                    {
                        path: 'bMap',
                        component: () => import('@/views/map/BMap.vue'),
                        meta: {
                            name: "百度地图"
                        },
                    },
                    {
                        path: 'gMap',
                        component: () => import('@/views/map/GMap.vue'),
                        meta: {
                            name: "高德地图"
                        },
                    },
                    {
                        path: 'tMap',
                        component: () => import('@/views/map/TMap.vue'),
                        meta: {
                            name: "天地图"
                        },
                    },
                    {
                        path: 'openlayer',
                        component: () => import('@/views/map/Openlayer.vue'),
                        meta: {
                            name: "Openlayer"
                        },
                    }
                ]
            },
            {
                path: "/canvas",
                component: () => import('@/views/canvas/Index.vue'),
                meta: {
                    name: "fabric"
                },
            },
            {
                path: "/editor",
                component: () => import('@/views/editor/Index.vue'),
                meta: {
                    name: "富文本"
                },
                children:[
                    {
                        path:'wangEditor',
                        component: () => import('@/views/editor/WangEditor.vue'),
                        meta: {
                            name: "wangEditor"
                        },
                    }
                ]
            },
        ]
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});

export default router
