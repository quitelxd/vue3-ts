<template>
    <router-view/>
</template>

<script lang="ts">
    import {defineComponent,provide} from 'vue';
    import * as echarts from 'echarts';

    export default defineComponent({
        name: 'App',
        setup(){
            provide('echarts',echarts)//provid
        },
        components: {
        }
    });
</script>

<style lang="less">
    #app{

    }
</style>
