import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getToken, setToken } from '@/utils'

describe('Token工具函数', () => {
  // 每个测试前重置模拟
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('setToken应该调用sessionStorage.setItem', () => {
    // 调用被测试函数
    const testToken = 'test-token-12345'
    setToken(testToken)
    
    // 验证结果
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token', testToken)
  })

  it('getToken应该调用sessionStorage.getItem', () => {
    // 模拟返回值
    const testToken = 'test-token-return'
    sessionStorage.getItem.mockReturnValue(testToken)
    
    // 调用被测试函数
    const result = getToken()
    
    // 验证结果
    expect(sessionStorage.getItem).toHaveBeenCalledWith('token')
    expect(result).toBe(testToken)
  })
}) 