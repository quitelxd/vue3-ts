<template>
    <div style="width: 100%;overflow: hidden;">
        <el-row :gutter="20">
            <el-col :span="12">
                <div id="line" class="chartHeight"></div>
            </el-col>
            <el-col :span="12">
                <div id="circle" class="chartHeight"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Line, Pie, measureTextWidth } from '@antv/g2plot'

onMounted(() => {
    drawLine()
    drawCircle()
})

function drawLine() {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
        .then((res) => res.json())
        .then((data) => {
            const linePlot = new Line('line', {
                data,
                xField: 'year',
                yField: 'gdp',
                seriesField: 'name',
                yAxis: {
                    label: {
                        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
                    },
                },
                legend: {
                    position: 'top',
                },
                smooth: true,
                // @TODO 后续会换一种动画方式
                animation: {
                    appear: {
                        animation: 'path-in',
                        duration: 5000,
                    },
                },
            })

            linePlot.render()
        })
}

function drawCircle() {
    function renderStatistic(containerWidth, text, style) {
        const textWidth = measureTextWidth(text, style)
        const textHeight = style.lineHeight || style.fontSize
        const R = containerWidth / 2
        // r^2 = (w / 2)^2 + (h - offsetY)^2
        let scale = 1
        if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
        }
        const textStyleStr = `width:${containerWidth}px;`
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
    }

    const data = [
        {type: '分类一', value: 27},
        {type: '分类二', value: 25},
        {type: '分类三', value: 18},
        {type: '分类四', value: 15},
        {type: '分类五', value: 10},
        {type: '其他', value: 5},
    ]

    const piePlot = new Pie('circle', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `${v} ¥`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
            },
            autoRotate: false,
            content: '{value}',
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container, view, datum) => {
                    const {width, height} = container.getBoundingClientRect()
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
                    const text = datum ? datum.type : '总计'
                    return renderStatistic(d, text, {fontSize: 28})
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '32px',
                },
                customHtml: (container, view, datum, data) => {
                    const {width} = container.getBoundingClientRect()

                    const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`
                    return renderStatistic(width, text, {fontSize: 32})
                },
            },
        },
        // 添加 中心统计文本 交互
        interactions: [{type: 'element-selected'}, {type: 'element-active'}, {type: 'pie-statistic-active'}],
    })

    piePlot.render()
}
</script>

<style scoped lang='less'>
    .chartHeight {
        height: 500px;
    }
</style>
