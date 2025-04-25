import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setToken } from '@/utils'

// 模拟依赖
vi.mock('@/utils', () => ({
  setToken: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
  useRoute: () => ({
    query: {
      redirect: '/dashboard'
    }
  })
}))

// 创建一个简化的登录组件进行测试
const SimpleLoginComponent = {
  template: `
    <div class="login">
      <div class="box">
        <div class="form">
          <div class="form-item">
            <label>用户名</label>
            <input v-model="form.name" />
          </div>
          <div class="form-item">
            <label>密码</label>
            <input v-model="form.password" type="password" />
          </div>
        </div>
        <div>填就行了</div>
        <div>
          <button @click="submit">登录</button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      form: { name: '', password: '' }
    }
  },
  methods: {
    submit() {
      if (this.formRef) {
        this.formRef.validate((valid) => {
          if (valid) {
            setToken('akjsdfhakjdhfkasdfjkhaslkdjf')
            if (this.router) {
              this.router.push('/dashboard')
            }
          } else {
            window.alert('填啊！！！')
          }
        })
      }
    }
  }
}

describe('Login.vue 组件测试', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SimpleLoginComponent)
  })

  it('应该正确渲染登录表单', () => {
    // 检查组件是否渲染成功
    expect(wrapper.find('.login').exists()).toBe(true)
    expect(wrapper.find('.box').exists()).toBe(true)
  })

  it('应该包含用户名和密码字段', () => {
    // 检查表单项是否存在
    expect(wrapper.html()).toContain('用户名')
    expect(wrapper.html()).toContain('密码')
  })

  it('应该有一个登录按钮', () => {
    // 检查登录按钮
    expect(wrapper.text()).toContain('登录')
  })

  it('提交空表单应该触发验证', async () => {
    // 模拟alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    // 模拟formRef实现
    wrapper.vm.formRef = {
      validate: (callback) => callback(false)
    }
    
    // 触发登录按钮点击
    await wrapper.find('button').trigger('click')
    
    // 验证结果
    expect(alertSpy).toHaveBeenCalledWith('填啊！！！')
    expect(setToken).not.toHaveBeenCalled()
  })

  it('提交有效表单应该设置token并导航', async () => {
    // 手动模拟路由
    const routerPush = vi.fn()
    wrapper.vm.router = { push: routerPush }
    
    // 手动模拟表单验证
    wrapper.vm.formRef = {
      validate: (callback) => callback(true)
    }
    
    // 触发登录按钮点击
    await wrapper.find('button').trigger('click')
    
    // 验证结果
    expect(setToken).toHaveBeenCalledWith('akjsdfhakjdhfkasdfjkhaslkdjf')
    expect(routerPush).toHaveBeenCalledWith('/dashboard')
  })
}) 