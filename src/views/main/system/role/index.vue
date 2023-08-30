<template>
  <div class="role">
    <div class="search">
      <PageSearch :search-config="searchConfig" @search-change="handelSearchChange" @reset-change="handleResetChange" />
    </div>
    <div class="content">
      <PageContent
        :content-config="contentConfig"
        :page-list="pageList"
        @add-click="handleAddClick"
        @edit-click="handleEditClick"
      />
    </div>
    <div class="pagination">
      <PagePagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="pageTotalCount"
        @update:page-size="updatePageSize"
        @update:current-page="updateCurrentPage"
        ref="paginationRef"
      />
    </div>
    <PageModal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type { ElForm, ElTree } from 'element-plus'
import { storeToRefs } from 'pinia'
import { mapMenuListToIds } from '@/utils/map-menus'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PagePagination from '@/components/page-pagination/page-pagination.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import useSystemStore from '@/store/main/system'
import useMainStore from '@/store/main'
import usePageContent from '@/hooks/usePageContent'

import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from './config/modal.config.ts'

const paginationRef = ref<InstanceType<typeof ElForm>>()
const modalRef = ref<InstanceType<typeof ElForm>>()
const treeRef = ref<InstanceType<typeof ElTree>>()
//发送请求
const systemStore = useSystemStore()
const mainStore = useMainStore()

const {
  currentPage,
  pageSize,
  updatePageSize,
  updateCurrentPage,
  fetchPageList,
  handelSearchChange,
  handleResetChange
} = usePageContent(systemStore, 'role')
onMounted(() => {
  fetchPageList()
})
//获取数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
const { entireMenus } = storeToRefs(mainStore)

//添加
const handleAddClick = () => {
  modalRef.value?.setDialogVisible()
}
//编辑
const handleEditClick = (row: any) => {
  modalRef.value?.setDialogVisible(false, row)
  const ids = mapMenuListToIds(row.menuList)
  console.log('ids', ids)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(ids)
  })
}
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log(menuList)
  otherInfo.value = { menuList }
}
</script>

<style scoped lang="less">
.role {
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
