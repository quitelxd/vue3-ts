<template>
    <div class="nav">
        <span class="menuClickBtn">
            <i class="el-icon-s-fold" v-if="leftMenu" @click="leftMenuFun"></i>
            <i class="el-icon-s-unfold" v-if="!leftMenu" @click="leftMenuFun"></i>
        </span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in bread" :key="item.path">{{item.meta.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="rightGroup">
            <span>你好，admin</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const userStore = useUserStore()
const { isCollapse } = storeToRefs(appStore)
const { userInfo } = storeToRefs(userStore)

const toggleCollapse = () => {
    appStore.toggleCollapse()
}

const handleLogout = () => {
    userStore.logout()
}
</script>

<style scoped lang="less">
    .nav {
        height: 50px;
        box-shadow: 0 0 5px 0 #000;
        background: #ffffff;
        line-height: 50px;
        padding: 0 15px;

        .menuClickBtn {
            cursor: pointer;
            font-size: 2.4rem;
            margin-right: 10px;

            &:hover {
                color: #666;
            }
        }

        .rightGroup{
            float: right;
            display: flex;
        }
        .bread {
            display: inline-block;
        }
    }
</style>
