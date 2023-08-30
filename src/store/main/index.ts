import { defineStore } from 'pinia'
import { getEntireRoles, getEntireDepartments, getEntireMenu } from '@/service/main'
interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async getEntireRolesAction() {
      const entireRolesResult = await getEntireRoles()
      this.entireRoles = entireRolesResult.data.list
    },
    async getEntireDepartmentsAction() {
      const entireDepartmentsResult = await getEntireDepartments()
      this.entireDepartments = entireDepartmentsResult.data.list
    },
    async getEntireMenuAction() {
      const entireMenuResult = await getEntireMenu()
      this.entireMenus = entireMenuResult.data.list
    },
    async getEntireRolesAndDepartmentsAction() {
      await this.getEntireRolesAction()
      await this.getEntireDepartmentsAction()
      await this.getEntireMenuAction()
    }
  }
})
export default useMainStore
