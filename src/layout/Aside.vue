<template>
    <div class="aside" :class="{width:!leftMenu}">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            逆水行舟
        </div>
        <el-scrollbar style="height: calc(100% - 51px)">
            <Menu></Menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Menu from './Menu.vue'

const store = useStore()
const leftMenu = computed(() => {
    return store.state.app.leftMenu
})
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
            box-shadow: none;
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
