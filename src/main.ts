import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
//路由
import router from '@/router'
//状态管理
import store from '@/store'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/el-message.css'

import registerIcons from '@/global/register-icon'

const app = createApp(App)
app.use(registerIcons)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
