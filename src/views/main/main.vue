<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <MainMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header><MainHeader @changeCollapse="handleCollapseChange" /></el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <div class="main">main:{{ counterStore.counter }}--{{ counterStore.doubleCount }}</div>
  <el-button type="primary" size="small" @click="changeCounter">修改</el-button> |
  <el-button type="danger" size="small" @click="changeExitClick">退出登录</el-button> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'

const isCollapse = ref(false)
const handleCollapseChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear;
      scrollbar-width: none;
      -ms-overflow-style: none;
      transition: width 0.3s ease;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      // background-color: aquamarine;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
