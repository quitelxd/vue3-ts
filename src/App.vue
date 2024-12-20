<template>
    <router-view/>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { provide } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

provide('echarts', echarts)

const userStore = useUserStore()
const appStore = useAppStore()
</script>

<style lang="less">
#app {
}
</style>
