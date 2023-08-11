import {Graph, Shape} from '@antv/x6'

// 控制连接桩显示/隐藏
export const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
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
    return {
        imageShapes: [
            {
                label: 'Client',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
            },
            {
                label: 'Http',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
            },
            {
                label: 'Api',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
            },
            {
                label: 'Sql',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
            },
            {
                label: 'Clound',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
            },
            {
                label: 'Mq',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
            },
        ],
        r1: graph.createNode({
            shape: 'custom-rect',
            label: '开始',
            attrs: {
                body: {
                    rx: 20,
                    ry: 26,
                },
            },
        }),
        r2: graph.createNode({
            shape: 'custom-rect',
            label: '过程',
        }),
        r3: graph.createNode({
            shape: 'custom-rect',
            attrs: {
                body: {
                    rx: 6,
                    ry: 6,
                },
            },
            label: '可选过程',
        }),
        r4: graph.createNode({
            shape: 'custom-polygon',
            attrs: {
                body: {
                    refPoints: '0,10 10,0 20,10 10,20',
                },
            },
            label: '决策',
        }),
        r5: graph.createNode({
            shape: 'custom-polygon',
            attrs: {
                body: {
                    refPoints: '10,0 40,0 30,20 0,20',
                },
            },
            label: '数据',
        }),
        r6: graph.createNode({
            shape: 'custom-circle',
            label: '连接',
        })
    }
}

export function reverseObject(object) {
    const newObject = {};
    const keys: any = [];

    for (const key in object) {
        keys.push(key);
    }

    for (let i = keys.length - 1; i >= 0; i--) {
        const value = object[keys[i]];
        newObject[keys[i]] = value;
    }

    return newObject;
}
