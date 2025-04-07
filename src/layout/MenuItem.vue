<template>
    <el-submenu :index="item.path" v-if="item.children && item.children.length >= 0">
        <template #title>
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.name}}</span>
        </template>
        <MenuItem v-for="child in item.children" :p-path="item.path" :item="child" :key="child.path"></MenuItem>
    </el-submenu>
    <el-menu-item :index="item.path" v-else>
        <div @click="toRoute(item.path)">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.name}}</span>
        </div>
    </el-menu-item>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    pPath: {
        type: String
    }
})

const router = useRouter()
const toRoute = (path) => {
    let routerStr = ""
    if(path.split('/').length > 1){
        routerStr = path
    }else{
        routerStr = props.pPath + '/' + path
    }
    router.push(routerStr).catch(() => {
        console.log("跳转错误")
    })
}
</script>

<style scoped lang="less">

</style>
