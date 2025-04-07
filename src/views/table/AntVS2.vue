<template>
    <div style="width: 100%;overflow: hidden;">
        <el-row :gutter="20">
            <el-col :span="12">
                <div id="sheet" class="tableHeight"></div>
            </el-col>
            <el-col :span="12">
                <div id="container" class="tableHeight"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { PivotSheet } from '@antv/s2'
import { debounce } from 'lodash'
import { tableData } from './TableData/AntVS2'

onMounted(() => {
    renderTable()
})

function renderTable() {
    const dom = document.getElementById("sheet")
    const config = {
        width: dom.clientWidth,
        height: dom.clientHeight
    }
    const s2 = new PivotSheet(dom, tableData, config)
    s2.render()
    const debounceRender = debounce((width, height) => {
        s2.changeSheetSize(width, height)
        s2.render(false) // 不重新加载数据
    }, 200)
    new window.ResizeObserver(([entry] = []) => {
        console.log(entry)
        const [size] = entry.borderBoxSize || []
        debounceRender(size.inlineSize, size.blockSize)
    }).observe(dom) // 通过监听 document.body 来实现监听窗口大小变化
}
</script>

<style scoped lang='less'>
    .tableHeight {
        height: 400px;
    }
</style>
