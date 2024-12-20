<template>
    <div class="aside" :class="{ width: isCollapse }">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            逆水行舟
        </div>
        <Menu></Menu>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import Menu from './Menu.vue'

const appStore = useAppStore()
const { isCollapse, menuList } = storeToRefs(appStore)
</script>

<style scoped lang="less">
    @import "@/less/var.less";

    .aside {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        width: @leftMenuWidth;
        transition: .5s;
        background: #ffffff;
        box-shadow: 0 0 5px 0 #000;
        &.width{
            left: -@leftMenuWidth;
        }
        .logo{
            padding: 0 10px;
            font-size: 2.4rem;
            color: #000;
            border-bottom: 1px solid #eee;
            img{
                height: 50px;
                vertical-align: middle;
            }
        }
    }
</style>
