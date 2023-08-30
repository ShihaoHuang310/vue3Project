<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      ref="formRef"
      :model="account"
      :rules="rules"
      :label-position="labelPosition"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" clearable show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { NAME, PASSWORD } from '@/global/constants'

const loginStore = useLoginStore()

const formRef = ref<InstanceType<typeof ElForm>>()

// 表单数据
const account = reactive<IAccount>({
  name: localCache.getCache(NAME) ?? '',
  password: localCache.getCache(PASSWORD) ?? ''
})
// label位置
const labelPosition = ref('left')
// 表单验证规则
const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //获取用户名账号密码
      const name = account.name
      const password = account.password
      //发送请求
      loginStore.accountLoginAction({ name, password }).then((res) => {
        if (isRemPwd) {
          localCache.setCache(NAME, name)
          localCache.setCache(PASSWORD, password)
        } else {
          localCache.removeCache(NAME)
          localCache.removeCache(PASSWORD)
        }
      })
    } else {
      ElMessage.error('表单验证失败')
    }
  })
}
// 导出
defineExpose({ loginAction })
</script>

<style scoped></style>
