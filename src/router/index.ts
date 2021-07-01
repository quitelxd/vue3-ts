import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Layout from "@/views/Layout.vue";

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component: () => import('@/views/Login.vue'),
        name: 'Login',
    },
    {
        path: "/",
        component: Layout,
        redirect: '/introduce',
        meta: {
            name: "首页",
            icon:""
        },
        children: [
            {
                path: '/introduce',
                component: () => import('@/views/introduce/Index.vue'),
                name: 'Introduce',
                meta: {
                    name: "简介",
                    icon:"iconfont icon-jianjie"
                },
            },
            {
                path: "/echarts",
                component: () => import('@/views/echarts/Echarts.vue'),
                meta: {
                    name: "echarts",
                    icon:"iconfont icon-tubiao"
                }
            },
            {
                path: "/table",
                component: () => import('@/views/table/Index.vue'),
                meta: {
                    name: "表格",
                    icon:"iconfont icon-biaoge"
                },
                children: [
                    {
                        path: 'elementTable',
                        component: () => import('@/views/table/Table.vue'),
                        meta: {
                            name: "饿了么table",
                            icon:"iconfont icon-eleme"
                        },
                    },
                    {
                        path: 'easyTable',
                        component: () => import('@/views/table/EasyTable.vue'),
                        meta: {
                            name: "EasyTable",
                            icon:"iconfont icon-biaoge"
                        },
                    }
                ]
            },
            {
                path: "/map",
                component: () => import('@/views/map/Index.vue'),
                meta: {
                    name: "地图",
                    icon:"iconfont icon-ditu"
                },
                children: [
                    {
                        path: 'bMap',
                        component: () => import('@/views/map/BMap.vue'),
                        meta: {
                            name: "百度地图",
                            icon:"iconfont icon-iconbaiduditu"
                        },
                    },
                    {
                        path: 'gMap',
                        component: () => import('@/views/map/GMap.vue'),
                        meta: {
                            name: "高德地图",
                            icon:"iconfont icon-mapOfGaud"
                        },
                    },
                    {
                        path: 'tMap',
                        component: () => import('@/views/map/TMap.vue'),
                        meta: {
                            name: "天地图",
                            icon:"iconfont icon-tianditu"
                        },
                    },
                    {
                        path: 'openlayer',
                        component: () => import('@/views/map/Openlayer.vue'),
                        meta: {
                            name: "Openlayer",
                            icon:"iconfont icon-OpenLayers"
                        },
                    }
                ]
            },
            {
                path: "/canvas",
                component: () => import('@/views/canvas/Index.vue'),
                meta: {
                    name: "fabric",
                    icon:"iconfont icon-canvas"
                },
            },
            {
                path: "/editor",
                component: () => import('@/views/editor/Index.vue'),
                meta: {
                    name: "富文本",
                    icon:"iconfont icon-fuwenben"
                },
                children:[
                    {
                        path:'wangEditor',
                        component: () => import('@/views/editor/WangEditor.vue'),
                        meta: {
                            name: "wangEditor",
                            icon:"iconfont icon-alibaba1193368easyiconnet"
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
