import type { RouteRecordRaw } from 'vue-router'

const loadLocalRoutes = () => {
  //动态添加路由
  const localRoute: RouteRecordRaw[] = []
  //读取router文件夹main文件夹所有文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // console.log('files-->', files)
  for (const key in files) {
    const module = files[key]
    localRoute.push(module.default)
  }
  console.log('localRoute', localRoute)
  return localRoute
}
//记录第一个匹配路由
export let firstMenu: any = null

export function mapMenusToRoutes(menuInfo: any[]) {
  //加载本地路由
  const localRoute = loadLocalRoutes()
  //根据菜单匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of menuInfo) {
    for (const subMenu of menu.children) {
      const findRoute = localRoute.find((item) => item.path === subMenu.url)
      if (findRoute) {
        //1.给route的顶层添加重定向功能（只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: findRoute.path })
        }
        //二级菜单
        routes.push(findRoute)
      }
      //2记录第一个匹配路由
      if (!firstMenu && findRoute) firstMenu = subMenu
    }
  }
  return routes
}
/**
 * 点击菜单
 * @param path 需要匹配路径
 * @param menuList 菜单列表
 */
export const mapPathToMenu = (path: string, menuList: any[]) => {
  for (const menu of menuList) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}
/**
 * 点击面包屑跳转到对应的菜单
 * @param path
 * @param menuList
 * @returns
 */
export const mapPathToBreadcrumb = (path: string, menuList: any[]) => {
  const breadcrumbs: any[] = []
  const recursion = (menuList: any[]) => {
    for (const menu of menuList) {
      for (const subMenu of menu.children) {
        if (subMenu.url === path) {
          breadcrumbs.push({ name: menu.name, path: menu.url })
          breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
          return true
        }
      }
    }
  }
  recursion(menuList)
  return breadcrumbs
}

export const mapMenuListToIds = (menuList: any[]) => {
  const ids: number[] = []
  const recursion = (menuList: any[]) => {
    for (const menu of menuList) {
      ids.push(menu.id)
      if (menu.children) {
        recursion(menu.children)
      }
    }
  }
  recursion(menuList)
  return ids
}

export const mapMenusToPermission = (menuList: any[]) => {
  const permissions: any[] = []
  const recursion = (menuList: any[]) => {
    for (const item of menuList) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recursion(item.children ?? [])
      }
    }
  }
  recursion(menuList)
  return permissions
}
