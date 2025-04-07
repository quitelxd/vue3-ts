<template>
    <div class="layout">
        <Aside></Aside>
        <div class="right" :class="{width : !leftMenu}">
            <Nav></Nav>
            <div class="content">
                <el-scrollbar style="height: 100%;">
                    <router-view/>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Nav from "@/layout/Nav.vue"
import Aside from "@/layout/Aside.vue"
import { useStore } from "vuex"

const store = useStore()
const leftMenu = computed(() => {
    return store.state.app.leftMenu
})
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
