import {createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory} from "vue-router";
import Layout from "@/views/Layout.vue";

export const constantRoutes: RouteRecordRaw[] = [
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
            icon: ""
        },
        children: [
            {
                path: '/introduce',
                component: () => import('@/views/introduce/Index.vue'),
                name: 'Introduce',
                meta: {
                    name: "简介",
                    icon: "iconfont icon-jianjie"
                },
            },
            {
                path: "/charts",
                component: () => import('@/views/echarts/Charts.vue'),
                meta: {
                    name: "图表",
                    icon: "iconfont icon-tubiao"
                },
                children: [
                    {
                        path: 'echarts',
                        component: () => import('@/views/echarts/Echarts.vue'),
                        meta: {
                            name: "echarts",
                            icon: "iconfont icon-tubiao"
                        },
                    },
                    {
                        path: 'AntVG2',
                        component: () => import('@/views/echarts/AntVG2.vue'),
                        meta: {
                            name: "AntV G2",
                            icon: "iconfont icon-keshihuatubiao-"
                        },
                    },
                ]
            },
            {
                path: "/table",
                component: () => import('@/views/table/Index.vue'),
                meta: {
                    name: "表格",
                    icon: "iconfont icon-biaoge"
                },
                children: [
                    {
                        path: 'elementTable',
                        component: () => import('@/views/table/Table.vue'),
                        meta: {
                            name: "饿了么table",
                            icon: "iconfont icon-eleme"
                        },
                    },
                    {
                        path: 'easyTable',
                        component: () => import('@/views/table/EasyTable.vue'),
                        meta: {
                            name: "EasyTable",
                            icon: "iconfont icon-biaoge"
                        },
                    },
                    {
                        path: 'AntVS2',
                        component: () => import('@/views/table/AntVS2.vue'),
                        meta: {
                            name: "AntV S2",
                            icon: "iconfont icon-ic-header-report"
                        },
                    }
                ]
            },
            {
                path: "/map",
                component: () => import('@/views/map/Index.vue'),
                meta: {
                    name: "地图",
                    icon: "iconfont icon-ditu"
                },
                children: [
                    {
                        path: 'bMap',
                        component: () => import('@/views/map/BMap.vue'),
                        meta: {
                            name: "百度地图",
                            icon: "iconfont icon-iconbaiduditu"
                        },
                    },
                    {
                        path: 'gMap',
                        component: () => import('@/views/map/GMap.vue'),
                        meta: {
                            name: "高德地图",
                            icon: "iconfont icon-mapOfGaud"
                        },
                    },
                    {
                        path: 'tMap',
                        component: () => import('@/views/map/TMap.vue'),
                        meta: {
                            name: "天地图",
                            icon: "iconfont icon-tianditu"
                        },
                    },
                    {
                        path: 'openlayer',
                        component: () => import('@/views/map/Openlayer.vue'),
                        meta: {
                            name: "Openlayer",
                            icon: "iconfont icon-OpenLayers"
                        },
                    }
                ]
            },
            {
                path: "/canvas",
                component: () => import('@/views/canvas/Index.vue'),
                meta: {
                    name: "fabric",
                    icon: "iconfont icon-canvas"
                },
            },
            {
                path: "/editor",
                component: () => import('@/views/editor/Index.vue'),
                meta: {
                    name: "富文本",
                    icon: "iconfont icon-fuwenben"
                },
                children: [
                    {
                        path: 'wangEditor',
                        component: () => import('@/views/editor/WangEditor.vue'),
                        meta: {
                            name: "wangEditor",
                            icon: "iconfont icon-alibaba1193368easyiconnet"
                        },
                    }
                ]
            },
            {
                path: "/css",
                component: () => import('@/views/css/Index.vue'),
                meta: {
                    name: "Css问题",
                    icon: "iconfont icon-alibaba1193368easyiconnet"
                },
            },
            {
                path: "/three",
                component: () => import('@/views/three/Index.vue'),
                meta: {
                    name: "Three.js",
                    icon: "iconfont icon-alibaba1193368easyiconnet"
                },
            },
            {
                path: "/flow",
                component: () => import('@/views/flow/Index.vue'),
                meta: {
                    name: "流程图",
                    icon: "iconfont icon-jurassic_process"
                },
                children: [
                    {
                        path: 'AntVX6',
                        component: () => import('@/views/flow/AntVX6.vue'),
                        meta: {
                            name: "AntV X6",
                            icon: "iconfont icon-SCMliucheng"
                        },
                    },
                    {
                        path: 'bpmn',
                        component: () => import('@/views/flow/bpmn.vue'),
                        meta: {
                            name: "bpmn.js",
                            icon: "iconfont icon-liuchengguanli-"
                        },
                    }
                ]
            },
        ]
    },

];
const router = createRouter({
    history: process.env.VUE_APP_TYPE === 'github' ? createWebHashHistory() : createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
});

export default router
