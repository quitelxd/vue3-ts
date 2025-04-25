import { vi } from 'vitest'

// 全局模拟Element Plus组件
vi.mock('element-plus', () => {
  return {
    ElMessage: {
      success: vi.fn(),
      warning: vi.fn(),
      error: vi.fn()
    }
  }
})

// 创建一个全局的sessionStorage模拟，因为测试环境中可能不存在
global.sessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
} 