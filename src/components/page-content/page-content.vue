<template>
  <div class="content-main">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="success" @click="handleAdd">{{
        contentConfig.header?.btnTitle ?? '新建'
      }}</el-button>
    </div>
    <div class="table">
      <el-table height="100%" :data="pageList" border size="large" v-bind="contentConfig.childrenTree" stripe>
        <template v-for="list in contentConfig.propsList" :key="list.prop">
          <template v-if="list.type === 'timer'">
            <el-table-column v-bind="list">
              <template #default="scope">
                {{ formatUTC(scope.row[list.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="list.type === 'custom'">
            <el-table-column v-bind="list">
              <template #default="scope">
                <slot :name="list.slotName" v-bind="scope" :prop="list.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="list.type === 'handler'">
            <el-table-column v-bind="list">
              <template #default="scope">
                <el-button v-if="isUpdate" link type="primary" size="small" @click="handleEdit(scope.row)">
                  <el-icon><Edit /></el-icon>
                  编辑</el-button
                >
                <el-button v-if="isDelete" link type="danger" size="small" @click="handelDelete(scope.row.id)">
                  <el-icon><Delete /></el-icon>
                  删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="list" />
          </template>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSystemStore from '@/store/main/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  pageList: any[]
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const systemStore = useSystemStore()
const props = defineProps<IProps>()
const emit = defineEmits(['add-click', 'edit-click'])

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

//删除
const handelDelete = (id: number) => {
  console.log('删除id', id)
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
//编辑
const handleEdit = (row: any) => {
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
