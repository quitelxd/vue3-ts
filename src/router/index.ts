import { createRouter, createWebHashHistory,RouteRecordRaw } from "vue-router";
import Dashboard from  '@/views/dashboard/Index.vue'
import Layout from "@/views/Layout.vue";

export const routers:Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta:{
          name:"图标"
        },
      }
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
  routes: routers
});

export default router
