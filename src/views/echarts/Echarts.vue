<template>
    <div>
        <el-row :gutter="15">
            <el-col :span="12">
                <div id="myChart"></div>
            </el-col>
            <el-col :span="12">
                <el-button @click="change">改变</el-button>
            </el-col>
            <el-col :span="24">
                <div id="myChart1"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, inject } from 'vue'

const echarts = inject("echarts")
let myChart = null
let myChart1 = null

const myChartOption = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}

const myChartOption1 = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
}

const change = () => {
    myChart.setOption({
        title: {
            text: "改变后的TITLE"
        },
        series: [{
            name: '销量',
            type: 'bar',
            data: [51, 25, 30, 50, 10, 20]
        }]
    })
}

onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('myChart'))
    // 绘制图表
    myChart.setOption(myChartOption)
    window.onresize = function () {//自适应大小
        myChart.resize()
    }
    myChart1 = echarts.init(document.getElementById('myChart1'))
    myChart1.setOption(myChartOption1)
})

onUnmounted(() => {
    myChart.dispose()
    myChart1.dispose()
})
</script>

<style scoped lang="less">
    #myChart {
        height: 500px;
    }

    #myChart1 {
        height: 500px;
    }
</style>
