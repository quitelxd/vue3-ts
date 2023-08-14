<template>
    <div id="container">
        <div id="stencil"></div>
        <div id="graph-container"></div>
    </div>
    <div>
        <el-button type="primary" @click="exportSVG">导出svg</el-button>
        <el-button type="primary" @click="exportPng">导出png</el-button>
        <el-button type="primary" @click="getShape">获取节点</el-button>
    </div>
</template>
<script lang="ts">
    import {defineComponent, reactive, toRefs, onMounted} from 'vue';
    import {Graph, Shape} from '@antv/x6'
    import {Stencil} from "@antv/x6-plugin-stencil"
    import {createBlock, showPorts, block, reverseObject} from './hook/UseAntVFlow'
    import {Export} from '@antv/x6-plugin-export';
    import {ElMessage} from 'element-plus';
    import {uniqBy} from 'lodash'


    export default defineComponent({
        name: 'AntVX6',
        setup() {
            const data = reactive({})
            onMounted(() => {
                createBlock()
                init()
            })


            let graph;

            function init() {
                // #region 初始化画布
                graph = new Graph({
                    container: document.getElementById('graph-container')!,
                    grid: true,
                    // resizing: true,
                    // rotating: true,
                    // selecting: {
                    //     enabled: true,
                    //     rubberband: true,
                    //     showNodeSelectionBox: true,
                    // },
                    // snapline: true,
                    // keyboard: true,
                    // clipboard: true,
                    mousewheel: {
                        enabled: true,
                        zoomAtMousePosition: true,
                        modifiers: 'ctrl',
                        minScale: 0.5,
                        maxScale: 3,
                    },
                    connecting: {
                        router: {
                            name: 'manhattan',
                            args: {
                                padding: 1,
                            },
                        },
                        connector: {
                            name: 'rounded',
                            args: {
                                radius: 8,
                            },
                        },
                        anchor: 'center',
                        connectionPoint: 'anchor',
                        allowBlank: false,
                        snap: {
                            radius: 20,
                        },
                        createEdge() {
                            return new Shape.Edge({
                                attrs: {
                                    line: {
                                        stroke: '#A2B1C3',
                                        strokeWidth: 2,
                                        targetMarker: {
                                            name: 'block',
                                            width: 12,
                                            height: 8,
                                        },
                                    },
                                },
                                zIndex: 0,
                            })
                        },
                        validateConnection({targetMagnet}) {
                            return !!targetMagnet
                        },
                    },
                    highlighting: {
                        magnetAdsorbed: {
                            name: 'stroke',
                            args: {
                                attrs: {
                                    fill: '#5F95FF',
                                    stroke: '#5F95FF',
                                },
                            },
                        },
                    },
                })
                // #endregion
                graph.on('node:mouseenter', () => {
                    const container = document.getElementById('graph-container')!
                    const ports = container.querySelectorAll(
                        '.x6-port-body',
                    ) as NodeListOf<SVGElement>
                    showPorts(ports, true)
                })
                graph.on('node:mouseleave', () => {
                    const container = document.getElementById('graph-container')!
                    const ports = container.querySelectorAll(
                        '.x6-port-body',
                    ) as NodeListOf<SVGElement>
                    showPorts(ports, false)
                })
                // #region 初始化 stencil
                const stencil = new Stencil({
                    title: '流程图',
                    target: graph,
                    stencilGraphWidth: 200,
                    stencilGraphHeight: 180,
                    collapsable: true,
                    groups: [
                        {
                            title: '基础流程图',
                            name: 'group1',
                        },
                        {
                            title: '系统设计图',
                            name: 'group2',
                            graphHeight: 250,
                            layoutOptions: {
                                rowHeight: 70,
                            },
                        },
                    ],
                    layoutOptions: {
                        columns: 2,
                        columnWidth: 80,
                        rowHeight: 55,
                    },
                })
                document.getElementById('stencil')!.appendChild(stencil.container)

                const {r1, r2, r3, r4, r5, r6, imageShapes} = block(graph)
                stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
                const imageNodes = imageShapes.map((item) =>
                    graph.createNode({
                        shape: 'custom-image',
                        label: item.label,
                        attrs: {
                            image: {
                                'xlink:href': item.image,
                            },
                        },
                    }),
                )
                stencil.load(imageNodes, 'group2')
                graph.use(new Export())
            }

            function exportPng() {
                graph.exportPNG('chart', {})
            }

            function exportSvg() {
                ElMessage.warning("tmd不好使，暂且先这样")
                graph.exportSVG('chart', {
                    preserveDimensions: true
                })
            }

            function getShape() {
                ElMessage.success("结果请看控制台")
                // console.log(graph)
                console.log('画布所有东西包括线', graph.getCells())
                console.log('节点不带线', graph.getNodes())
                const line = graph.getCells().filter(item => item.shape === 'edge')
                const blocks = graph.getNodes()
                let blocksSort:any[] = []
                line.forEach(item => {
                    const sourceId = item['source']['cell']
                    const targetId = item['target']['cell']
                    blocks.forEach(b => {
                        if (b.id === sourceId) {
                            blocksSort.push(b)
                        }
                        if (b.id === targetId) {
                            blocksSort.push(b)
                        }
                    })
                })
                console.log("这里的顺序是有问题的需要调整", uniqBy(blocksSort,'id'))
            }

            return {
                ...toRefs(data),
                exportPng,
                exportSvg,
                getShape
            };
        },
    });
</script>

<style scoped lang='less'>
    .tool {
        width: 100%;
        overflow: hidden;
    }

    #container {
        height: 500px;
        border: 1px solid #ddd;
        display: flex;

        #stencil {
            height: 500px;
            width: 20%;
            position: relative;
        }

        #graph-container {
            width: 80%;
        }
    }

</style>
