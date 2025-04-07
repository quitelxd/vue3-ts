<template>
    <router-view/>
</template>

<script setup>
import * as echarts from 'echarts';
import { provide } from 'vue';

provide('echarts', echarts)
</script>

<style lang="less">
    #app {

    }
</style>
