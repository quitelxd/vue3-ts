<template>
    <el-menu :default-active="defaultActive" :collapse="isCollapse">
        <MenuItem v-for="item in menuItems" :key="item.path" :item="item" :p-path="item.path"></MenuItem>
    </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import MenuItem from './MenuItem.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { isCollapse } = storeToRefs(appStore)

// 获取路由菜单
const menuItems = computed(() => {
    return router.options.routes.filter(item => {
        return item.path === "/"
    })[0].children
})

// 计算当前激活的菜单项
const defaultActive = computed(() => {
    const { path } = route
    let arr = path.split('/')
    return arr.length === 2 ? '/' + arr[arr.length - 1] : arr[arr.length - 1]
})
</script>

<style scoped>
</style>
