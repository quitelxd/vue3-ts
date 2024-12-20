import { defineStore } from 'pinia'
import { getToken } from '@/utils'

interface UserState {
  token: string
  userInfo: {
    username?: string
    role?: string[]
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken() || '',
    userInfo: {}
  }),
  
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(info: UserState['userInfo']) {
      this.userInfo = info
    },
    logout() {
      this.token = ''
      this.userInfo = {}
    }
  },

  getters: {
    hasToken: (state) => !!state.token,
    username: (state) => state.userInfo.username
  },

  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['token', 'userInfo'] // 指定要持久化的字段
  }
}) 