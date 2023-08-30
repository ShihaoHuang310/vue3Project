<template>
  <div class="search">
    <el-form ref="formRef" size="large" :model="searchForm" label-width="80px">
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="`el-${item.type}`" /> -->
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  style="width: 100%"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <!-- 搜索和重置 -->
      <div class="btns">
        <el-button v-if="isQuery" type="primary" @click="handleSearch" icon="search">查询</el-button>
        <el-button icon="refresh" @click="handleReset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}

const emit = defineEmits(['searchChange', 'resetChange'])
const formRef = ref<InstanceType<typeof ElForm>>()
const props = defineProps<IProps>()

const initForm: any = {}
for (const item of props.searchConfig.formItems) {
  initForm[item.prop] = item.initialValue ?? ''
}
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
const searchForm = reactive(initForm)
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
