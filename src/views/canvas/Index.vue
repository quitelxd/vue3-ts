<template>
    <div class="gongju">
        <div class="h3">工具栏</div>
        <div class="box">
            <div @click="selectDraw" :class="{ zactive: currentType === 'selectable' }">
                <span>选择</span>
            </div>
            <div @click="lineDraw" :class="{ zactive: currentType === 'line' }">
                <span>直线</span>
            </div>
            <div @click="rectDraw" :class="{ zactive: currentType === 'rect' }">
                <span>矩形</span>
            </div>
            <div @click="triangleDraw" :class="{ zactive: currentType === 'triangle' }">
                <span>三角</span>
            </div>
            <div @click="circleDraw" :class="{ zactive: currentType === 'circle' }">
                <span>圆圈</span>
            </div>
            <div @click="freeDraw" :class="{ zactive: currentType === 'free' }">
                <span>画笔</span>
            </div>
            <div @click="clear">
                <span>清除</span>
            </div>
            <div @click="textDraw" :class="{ zactive: currentType === 'text' }">
                <span>文本</span>
            </div>
            <div @click="unselectDraw" :class="{ zactive: currentType === 'unselectable' }">
                <span>禁用</span>
            </div>
            <div @click="del">
                <span>删除</span>
            </div>
            <div @click="undoDraw">
                <span>撤销</span>
            </div>
            <div @click="exportCanvas">
                <span>导出</span>
            </div>
            <div>
                <el-color-picker v-model="colors" class="colors"
                                 @change="colorChange"></el-color-picker>
            </div>

        </div>
    </div>
    <div id="canvasBox">
        <canvas id="drawBox" height="300"></canvas>
    </div>
    <div class="problem">
        其他：这是在B站中边看视频边敲的代码，结合关官网中的API和例子，后期经过自己的一些整改运用到项目中，在这里重新整理运用ts代码写一下；
    </div>
    <div class="problem" style="color: red;">
        注意：有两个地方需要注意；1、在绘制图形时，注意画布在页面中的位置，如果有css布局，需要计算出canvas距离上面和左面的距离，在mouse事件的时候记得做运算；
        2、绘制正方形时向左上方拖拽会有bug，我的处理方式是取绝对值，这样避免了bug的出现
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from 'vue'
    import Canvas from './index'

    export default defineComponent({
        name: "Index",
        setup() {
            let colors = ref("red");
            let currentType = ref("free");
            let colorChange = () => {
                canvas.colorChange(colors.value);
            }
            let canvas: any = null;
            onMounted(() => {
                canvas = new Canvas('drawBox', 'canvasBox', {
                    color: "red",
                    strokeWidth: 3
                });
            });
            let selectDraw = () => {
                currentType.value = "selectable";
                canvas.selectDraw();
            };
            let lineDraw = () => {
                currentType.value = "line";
                canvas.lineDraw();
            };
            let rectDraw = () => {
                currentType.value = "rect";
                canvas.rectDraw();
            };
            let triangleDraw = () => {
                currentType.value = "triangle";
                canvas.triangleDraw();
            };
            let circleDraw = () => {
                currentType.value = "circle";
                canvas.circleDraw();
            };
            let freeDraw = () => {
                currentType.value = "free";
                canvas.freeDraw();
            };
            let clear = () => {
                canvas.clear();
            };
            let textDraw = () => {
                currentType.value = "text";
                canvas.textDraw();
            };
            let unselectDraw = () => {
                currentType.value = "unselectable";
                canvas.unselectDraw();
            };
            let del = () => {
                canvas.del();
            };
            let undoDraw = () => {
                canvas.undoDraw();
            };
            let exportCanvas = () => {
                canvas.exportCanvas();
            };
            return {
                selectDraw,
                lineDraw,
                rectDraw,
                triangleDraw,
                circleDraw,
                freeDraw,
                clear,
                textDraw,
                unselectDraw,
                del,
                undoDraw,
                exportCanvas,
                colors,
                colorChange,
                currentType
            }
        }
    })
</script>

<style scoped lang="less">
    #canvasBox {
        box-sizing: border-box;
        border: 1px solid #000;
        width: 100%;
    }

    .problem {
        text-indent: 2rem;
        font-size: 1.6rem;
        line-height: 3.5rem;
    }

    .gongju {
        margin-bottom: 10px;
        text-align: center;

        div.h3 {
            font-size: 2.0rem;
            font-weight: 800;
            padding: 10px 0;
        }

        .box {
            display: flex;

            div {
                font-weight: 800;
                flex: 1;
                height: 50px;
                line-height: 50px;
                border-radius: 5px;
                cursor: pointer;

                &:hover:not(:last-child) {
                    border: 1px solid #8ac8d4;
                }

                &.zactive {
                    border: 1px solid #8ac8d4;
                }
            }
        }
    }

</style>
