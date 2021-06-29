<template>
    <div class="layout">
        <Aside></Aside>
        <div class="right" :class="{width : !leftMenu}">
            <Nav></Nav>
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,computed} from 'vue';
    import Nav from "@/layout/Nav.vue";
    import Aside from "@/layout/Aside.vue";
    import {useStore} from "vuex";

    export default defineComponent({
        setup(){
            let store = useStore();
            let leftMenu = computed(():boolean=>{
                return store.state.app.leftMenu
            })
            return {
                leftMenu
            }
        },
        name: 'Layout',
        components: {
            Nav,
            Aside
        }
    });
</script>

<style scoped lang="less">
    @import "@/less/var.less";

    .layout {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: skyblue;
        .right{
            transition: .5s;
            margin-left: @leftMenuWidth;
            &.width{
                margin-left: 0;
            }
        }
    }
</style>
