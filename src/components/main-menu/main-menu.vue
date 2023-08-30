<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isCollapse">CMS后端管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isCollapse"
      >
        <template v-for="item in menuInfo" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><component :is="item.icon.split('el-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import userLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
//获取动态菜单
const loginStore = userLoginStore()
const menuInfo = loginStore.menuInfo

const router = useRouter()
const route = useRoute()
defineProps({
  //菜单是否折叠
  isCollapse: {
    type: Boolean,
    default: false
  }
})
//默认选中菜单
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, menuInfo)
  return pathMenu ? pathMenu.id + '' : ''
})

const handleItemClick = (item: any) => {
  const url = item.url
  console.log('item', item.url)

  //跳转路由
  router.push(url)
}
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
    &.is-active {
      background-color: #0a60bd;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>
