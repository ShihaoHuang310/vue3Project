import { defineStore } from 'pinia'
import {
  postUsersListData,
  deleteUsersById,
  addUserData,
  updateUserById,
  postPageListData,
  deletePageById,
  addPageData,
  updatePageById
} from '@/service/main/system'
import type { ISystemState } from './type'
import useMainStore from '..'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListResult.data
      this.userTotalCount = totalCount
      this.userList = list
    },
    async deleteUsersByIdAction(id: number) {
      const res = await deleteUsersById(id)
      console.log('delete', res)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async addUserAction(userInfo: any) {
      const res = await addUserData(userInfo)
      console.log('add', res)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async updateUserByIdAction(id: number, userInfo: any) {
      const res = await updateUserById(id, userInfo)
      console.log('update', res)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    //针对页面数据curd
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const res = await deletePageById(pageName, id)
      console.log('delete', res)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async addPageDataAction(pageName: string, pageInfo: any) {
      const res = await addPageData(pageName, pageInfo)
      console.log('add', res)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      //获取完整数据
      const mainStore = useMainStore()
      mainStore.getEntireRolesAndDepartmentsAction()
    },
    async updatePageDataAction(pageName: string, id: number, pageInfo: any) {
      const res = await updatePageById(pageName, id, pageInfo)
      console.log('update', res)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      //获取完整数据
      const mainStore = useMainStore()
      mainStore.getEntireRolesAndDepartmentsAction()
    }
  }
})
export default useSystemStore
