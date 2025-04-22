import {Graph} from '@antv/x6'

// 控制连接桩显示/隐藏
export const showPorts = (ports, show) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
}

export function createBlock() {
// #region 初始化图形
    const ports = {
        groups: {
            top: {
                position: 'top',
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 1,
                        fill: '#fff',
                        style: {
                            visibility: 'hidden',
                        },
                    },
                },
            },
            right: {
                position: 'right',
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 1,
                        fill: '#fff',
                        style: {
                            visibility: 'hidden',
                        },
                    },
                },
            },
            bottom: {
                position: 'bottom',
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 1,
                        fill: '#fff',
                        style: {
                            visibility: 'hidden',
                        },
                    },
                },
            },
            left: {
                position: 'left',
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 1,
                        fill: '#fff',
                        style: {
                            visibility: 'hidden',
                        },
                    },
                },
            },
        },
        items: [
            {
                group: 'top',
            },
            {
                group: 'right',
            },
            {
                group: 'bottom',
            },
            {
                group: 'left',
            },
        ],
    }

    Graph.registerNode(
        'custom-rect',
        {
            inherit: 'rect',
            width: 66,
            height: 36,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                },
            },
            ports: {...ports},
        },
        true,
    )

    Graph.registerNode(
        'custom-polygon',
        {
            inherit: 'polygon',
            width: 66,
            height: 36,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                },
            },
            ports: {
                ...ports,
                items: [
                    {
                        group: 'top',
                    },
                    {
                        group: 'bottom',
                    },
                ],
            },
        },
        true,
    )

    Graph.registerNode(
        'custom-circle',
        {
            inherit: 'circle',
            width: 45,
            height: 45,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                },
            },
            ports: {...ports},
        },
        true,
    )

    Graph.registerNode(
        'custom-image',
        {
            inherit: 'rect',
            width: 52,
            height: 52,
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'image',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ],
            attrs: {
                body: {
                    stroke: '#5F95FF',
                    fill: '#5F95FF',
                },
                image: {
                    width: 26,
                    height: 26,
                    refX: 13,
                    refY: 16,
                },
                label: {
                    refX: 3,
                    refY: 2,
                    textAnchor: 'left',
                    textVerticalAnchor: 'top',
                    fontSize: 12,
                    fill: '#fff',
                },
            },
            ports: {...ports},
        },
        true,
    )
}

export function block(graph) {
    const r1 = graph.createNode({
        shape: 'custom-rect',
        label: '开始',
    });
    
    const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程',
    });
    
    const r3 = graph.createNode({
        shape: 'custom-polygon',
        label: '决策',
        points: '40,0 80,40 40,80 0,40',
    });
    
    const r4 = graph.createNode({
        shape: 'custom-circle',
        label: '开始',
    });
    
    const r5 = graph.createNode({
        shape: 'custom-circle',
        label: '结束',
    });
    
    const r6 = graph.createNode({
        shape: 'custom-rect',
        label: '子过程',
    });
    
    const imageShapes = [
        {
            label: '数据库',
            image: 'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
        },
        {
            label: '服务器',
            image: 'https://gw.alipayobjects.com/zos/bmw-prod/f00c3de4-3b8c-49fe-9e2c-f69a179b3955.svg',
        },
        {
            label: '手机',
            image: 'https://gw.alipayobjects.com/zos/bmw-prod/25fb0c33-a936-4354-9876-25ef6b5d7d74.svg',
        },
        {
            label: '用户',
            image: 'https://gw.alipayobjects.com/zos/bmw-prod/21b19468-fbb8-45d7-a8e4-4176f2ed6dad.svg',
        },
    ];
    
    return { r1, r2, r3, r4, r5, r6, imageShapes };
}

export function reverseObject(object) {
    const newObject = {}
    for (const [key, value] of Object.entries(object)) {
        newObject[value] = key
    }
    return newObject
} 