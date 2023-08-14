<template>
    <div class="aside" :class="{width:!leftMenu}">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            逆水行舟
        </div>
        <Menu></Menu>
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed,ref} from 'vue';
    import {useStore} from 'vuex';
    import Menu from './Menu.vue';
    export default defineComponent({
        name: "Aside",
        components:{
            Menu
        },
        setup(){
            const store = useStore();
            let leftMenu = computed(()=>{
                return store.state.app.leftMenu
            })
            return {
                leftMenu
            }
        }
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
