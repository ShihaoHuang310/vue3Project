<template>
  <div class="login-panel">
    <h1 class="title">CMS后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch @tab-click="handleClick">
        <!-- 账号登录panel -->
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </span>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录panel -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link href="#">忘记密码？</el-link>
    </div>

    <el-button class="login-btn" size="large" type="primary" @click="handleLoginAction"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'

import { localCache } from '@/utils/cache'

import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

const accountRef = ref<InstanceType<typeof PanelAccount>>()

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false) // 是否记住密码
const activeName = ref('account') // 当前激活的tab

watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
// 点击tab
const handleClick = (tab: TabsPaneContext) => {
  activeName.value = tab.paneName
}

//立即登录
const handleLoginAction = () => {
  if (activeName.value === 'account') {
    console.log('用户账户登录')
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
