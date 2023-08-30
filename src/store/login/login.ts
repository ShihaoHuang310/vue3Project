import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import type { IUserInfoData, IMenuInfoData } from '@/service/login/type'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'
import { TOKEN_KEY, USER_INFO, MENU_INFO } from '@/global/constants'
import useMainStore from '../main'
interface ILoginState {
  token: string
  userInfo: any
  // userInfo: IUserInfoData
  menuInfo: IMenuInfoData
  permissions: string[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    menuInfo: [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 获取账号信息
      const res = await accountLoginRequest(account)
      // console.log('res--->', res)
      const id = res.data.id
      const name = res.data.name
      this.token = res.data.token
      //本地缓存
      localCache.setCache(TOKEN_KEY, this.token)
      //获取用户信息(role)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // console.log('userInfo', this.userInfo)
      //获取权限信息(menu)
      const menuInfoResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const menuInfo = menuInfoResult.data
      this.menuInfo = menuInfo
      // console.log('menu info', this.menuInfo)
      //进行本地缓存
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(MENU_INFO, this.menuInfo)
      //请求所有的权限和部门
      const mainStore = useMainStore()
      mainStore.getEntireRolesAndDepartmentsAction()
      //获取登录用户所有按钮权限
      const permissions = mapMenusToPermission(this.menuInfo)
      this.permissions = permissions
      //动态添加路由
      const routes = mapMenusToRoutes(this.menuInfo)
      routes.forEach((route) => router.addRoute('main', route))
      //跳转mian页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(TOKEN_KEY)
      const userInfo = localCache.getCache(USER_INFO)
      const menuInfo = localCache.getCache(MENU_INFO)
      if (token && userInfo && menuInfo) {
        this.token = token
        this.userInfo = userInfo
        this.menuInfo = menuInfo

        //请求所有的权限和部门
        const mainStore = useMainStore()
        mainStore.getEntireRolesAndDepartmentsAction()

        //获取按钮权限
        const permissions = mapMenusToPermission(this.menuInfo)
        this.permissions = permissions
      }
      //动态添加路由
      const routes = mapMenusToRoutes(this.menuInfo)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
})
export default useLoginStore
