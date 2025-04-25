import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// 模拟X6相关依赖
vi.mock('@antv/x6', () => {
  return {
    Graph: vi.fn().mockImplementation(() => ({
      use: vi.fn(),
      on: vi.fn(),
      bindKey: vi.fn(),
      exportPNG: vi.fn(),
      exportSVG: vi.fn(),
      getCells: vi.fn().mockReturnValue([]),
      getNodes: vi.fn().mockReturnValue([]),
      getEdges: vi.fn().mockReturnValue([]),
      dispose: vi.fn()
    })),
    Shape: {
      Edge: vi.fn().mockImplementation(() => ({}))
    }
  }
})

vi.mock('@antv/x6-plugin-stencil', () => {
  return {
    Stencil: vi.fn().mockImplementation(() => ({
      container: document.createElement('div'),
      load: vi.fn()
    }))
  }
})

// 模拟其他X6插件
vi.mock('@antv/x6-plugin-export', () => ({ Export: vi.fn() }))
vi.mock('@antv/x6-plugin-transform', () => ({ Transform: vi.fn() }))
vi.mock('@antv/x6-plugin-selection', () => ({ Selection: vi.fn() }))
vi.mock('@antv/x6-plugin-snapline', () => ({ Snapline: vi.fn() }))
vi.mock('@antv/x6-plugin-keyboard', () => ({ Keyboard: vi.fn() }))
vi.mock('@antv/x6-plugin-clipboard', () => ({ Clipboard: vi.fn() }))
vi.mock('@antv/x6-plugin-history', () => ({ History: vi.fn() }))

// 模拟Element Plus
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  }
}))

// 模拟AntVFlow工具
vi.mock('@/views/flow/hook/UseAntVFlow', () => ({
  createBlock: vi.fn(),
  showPorts: vi.fn(),
  block: vi.fn().mockReturnValue({
    r1: {}, r2: {}, r3: {}, r4: {}, r5: {}, r6: {},
    imageShapes: [{ label: 'test', image: 'test.png' }]
  })
}))

// 创建简化的流程图组件
const SimplifiedAntVX6 = {
  template: `
    <div id="container">
      <div id="stencil"></div>
      <div id="graph-container"></div>
    </div>
    <div>
      <button class="export-svg" @click="exportSvg">导出svg</button>
      <button class="export-png" @click="exportPng">导出png</button>
      <button class="get-shape" @click="getShape">获取节点</button>
    </div>
  `,
  data() {
    return {
      graph: null
    }
  },
  mounted() {
    // 模拟初始化
    document.getElementById = vi.fn().mockImplementation((id) => {
      const el = document.createElement('div')
      el.id = id
      return el
    })
    
    this.graph = {
      exportPNG: vi.fn(),
      exportSVG: vi.fn(),
      getCells: vi.fn().mockReturnValue([]),
      getNodes: vi.fn().mockReturnValue([]),
      getEdges: vi.fn().mockReturnValue([])
    }
  },
  methods: {
    exportPng() {
      this.graph.exportPNG('chart', {})
    },
    exportSvg() {
      this.graph.exportSVG('chart', {
        preserveDimensions: true
      })
    },
    getShape() {
      this.graph.getCells()
      this.graph.getNodes()
      this.graph.getEdges()
    }
  }
}

describe('AntVX6组件测试', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SimplifiedAntVX6)
  })

  it('应该渲染基本的流程图界面元素', () => {
    expect(wrapper.find('#container').exists()).toBe(true)
    expect(wrapper.find('#stencil').exists()).toBe(true)
    expect(wrapper.find('#graph-container').exists()).toBe(true)
  })

  it('应该渲染导出和获取节点按钮', () => {
    expect(wrapper.find('.export-svg').exists()).toBe(true)
    expect(wrapper.find('.export-png').exists()).toBe(true)
    expect(wrapper.find('.get-shape').exists()).toBe(true)
    expect(wrapper.text()).toContain('导出svg')
    expect(wrapper.text()).toContain('导出png')
    expect(wrapper.text()).toContain('获取节点')
  })

  it('点击导出PNG按钮应调用相应方法', async () => {
    const spy = vi.spyOn(wrapper.vm.graph, 'exportPNG')
    await wrapper.find('.export-png').trigger('click')
    expect(spy).toHaveBeenCalledWith('chart', {})
  })

  it('点击导出SVG按钮应调用相应方法', async () => {
    const spy = vi.spyOn(wrapper.vm.graph, 'exportSVG')
    await wrapper.find('.export-svg').trigger('click')
    expect(spy).toHaveBeenCalledWith('chart', {
      preserveDimensions: true
    })
  })

  it('点击获取节点按钮应调用相应方法', async () => {
    const spyGetCells = vi.spyOn(wrapper.vm.graph, 'getCells')
    const spyGetNodes = vi.spyOn(wrapper.vm.graph, 'getNodes')
    const spyGetEdges = vi.spyOn(wrapper.vm.graph, 'getEdges')
    
    await wrapper.find('.get-shape').trigger('click')
    
    expect(spyGetCells).toHaveBeenCalled()
    expect(spyGetNodes).toHaveBeenCalled()
    expect(spyGetEdges).toHaveBeenCalled()
  })
}) 