<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToBreadcrumb } from '@/utils/map-menus'
import userLoginStore from '@/store/login/login'

//获取动态菜单
const loginStore = userLoginStore()
const menuInfo = loginStore.menuInfo

const router = useRouter()
const route = useRoute()
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumb(route.path, menuInfo)
})
</script>

<style lang="less" scoped></style>
