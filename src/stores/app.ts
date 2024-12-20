import { defineStore } from 'pinia'

interface AppState {
  isCollapse: boolean
  menuList: any[]
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isCollapse: false,
    menuList: []
  }),
  
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setMenuList(list: any[]) {
      this.menuList = list
    }
  }
}) 