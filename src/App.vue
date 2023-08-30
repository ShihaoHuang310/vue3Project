<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <header>
    <div class="app">
      <el-config-provider :locale="zhCn">
        <router-view />
      </el-config-provider>
    </div>
  </header>

  <main></main>
</template>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
