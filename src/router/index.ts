import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { TOKEN_KEY } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 404
    component: () => import('@/views/not-found/NotFound.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
// 动态路由
// router.addRoute()
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localCache.getCache(TOKEN_KEY)

  if (to.path.startsWith('/main') && !token) {
    next('/login')
  } else if (to.path === '/main') {
    return next(firstMenu?.url)
  } else {
    next()
  }
})
export default router
