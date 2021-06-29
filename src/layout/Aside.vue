<template>
    <div class="aside" :class="{width:!leftMenu}">
        Aside
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed,ref} from 'vue';
    import {useStore} from 'vuex';
    export default defineComponent({
        name: "Aside",
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
        background: #000;
        position: absolute;
        left: 0;
        top: 0;
        width: @leftMenuWidth;
        transition: .5s;
        &.width{
            left: -@leftMenuWidth;
        }
    }
</style>
