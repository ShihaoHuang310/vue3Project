<template>
  <div class="content-main">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="success" @click="handleAdd">新建</el-button>
    </div>
    <div class="table">
      <el-table height="100%" :data="pageList" border size="large" stripe>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="部门名称" align="center" />
        <el-table-column prop="leader" label="部门领导" align="center" />
        <el-table-column prop="parentId" label="上级部门" align="center" />

        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
            >
              <el-icon><Edit /></el-icon>
              编辑</el-button
            >
            <!-- <el-button link type="primary" size="small">
              <el-icon><Document /></el-icon>
              详情</el-button
            > -->
            <el-button
              link
              type="danger"
              size="small"
              @click="handelDelete(scope.row.id)"
            >
              <el-icon><Delete /></el-icon>
              删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useSystemStore from '@/store/main/system'
import { formatUTC } from '@/utils/format'

const systemStore = useSystemStore()
const prop = defineProps({
  pageList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['add-click', 'edit-click'])
//删除
const handelDelete = (id) => {
  console.log('删除id', id)
  systemStore.deletePageByIdAction('department', id)
}
//编辑
const handleEdit = (row) => {
  emit('edit-click', row)
}
//新建
const handleAdd = () => {
  emit('add-click')
}
</script>

<style lang="less" scoped>
.content-main {
  height: 100%;

  .table {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
  }
  // margin-top: 20px;\
  height: 100%;
  padding: 15px;
  background-color: #fff;
  // flex-direction: column;
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
