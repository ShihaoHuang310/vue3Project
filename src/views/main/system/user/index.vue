<template>
  <div class="user">
    <div class="search">
      <UserSearch @search-change="handelSearchChange" @reset-change="handleResetChange" />
    </div>
    <div class="content">
      <UserContent :user-list="userList" @add-click="handleAddClick" @edit-click="handleEditClick" />
    </div>
    <div class="pagination">
      <UserPagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="userTotalCount"
        @update:page-size="updatePageSize"
        @update:current-page="updateCurrentPage"
        ref="paginationRef"
      />
    </div>
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useSystemStore from '@/store/main/system'
import { storeToRefs } from 'pinia'

import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserPagination from './c-cpns/user-pagination.vue'
import UserModal from './c-cpns/user-modal.vue'

import type { ElForm } from 'element-plus'

const paginationRef = ref<InstanceType<typeof ElForm>>()
const modalRef = ref<InstanceType<typeof ElForm>>()

const currentPage = ref(1)
const pageSize = ref(10)

//发送请求
const systemStore = useSystemStore()

//发起网络请求
const fetchUsersList = (formData: any = {}) => {
  // 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageParams = { offset, size }
  const queryInfo = { ...pageParams, ...formData }
  systemStore.postUsersListAction(queryInfo)
}
onMounted(() => {
  fetchUsersList()
})
//获取数据
const { userList, userTotalCount } = storeToRefs(systemStore)
//修改pageSize
const updatePageSize = (val: number) => {
  console.log('updatePageSize--------', val)
  pageSize.value = val
  fetchUsersList()
}
// 分页:
const updateCurrentPage = (val: number) => {
  console.log('updateCurrentPage--------', val)
  currentPage.value = val
  fetchUsersList()
}
//查询
const handelSearchChange = (form: any) => {
  console.log('se----------', form)
  fetchUsersList(form)
}
//重置
const handleResetChange = () => {
  fetchUsersList()
}
//添加
const handleAddClick = () => {
  modalRef.value?.setDialogVisible()
}
//编辑
const handleEditClick = (row: any) => {
  console.log('row', row)
  modalRef.value?.setDialogVisible(false, row)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
  // padding-top: 60px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    flex: auto;
    overflow: hidden;
  }
  .search,
  .pagination {
    display: flex;
    background-color: #fff;
  }
  .search {
    margin-bottom: 12px;
  }
  .pagination {
    margin-top: 12px;
  }
}
</style>
