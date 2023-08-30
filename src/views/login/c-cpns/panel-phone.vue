<template>
  <div class="panel-phone">
    <el-form label-width="60px" ref="formRef" :model="phone">
      <el-form-item label="手机号">
        <el-input clearable />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input clearable />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const phone = ref({})
</script>

<style scoped lang="less">
.verify-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
