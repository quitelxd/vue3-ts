<template>
    <div class="layout" :class="{ 'is-collapse': !isCollapse }">
        <Aside></Aside>
        <div class="right" :class="{ width: isCollapse }">
            <Nav></Nav>
            <div class="content">
                <el-scrollbar style="height: 100%;">
                    <router-view/>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Nav from "@/layout/Nav.vue"
import Aside from "@/layout/Aside.vue"
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isCollapse } = storeToRefs(appStore)
</script>

<style scoped lang="less">
    @import "@/less/var.less";

    .layout {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f8f8f8;
        .right{
            height: 100%;
            transition: .5s;
            margin-left: @leftMenuWidth;
            &.width{
                margin-left: 0;
            }
            .content{
                height: calc(100% - 70px);
                padding: 10px;
            }
        }
    }
</style>
