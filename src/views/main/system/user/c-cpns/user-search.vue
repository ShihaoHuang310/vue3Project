<template>
  <div class="search">
    <el-form ref="formRef" size="large" :model="searchForm" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="searchForm.enable" placeholder="请选择禁用状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 搜索和重置 -->
      <div class="btns">
        <el-button type="primary" @click="handleSearch" icon="search">查询</el-button>
        <el-button icon="refresh" @click="handleReset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['searchChange', 'resetChange'])
const formRef = ref<InstanceType<typeof ElForm>>()

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
const handleSearch = () => {
  emit('searchChange', searchForm)
}
const handleReset = () => {
  formRef.value?.resetFields()
  emit('resetChange')
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 24px;
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
