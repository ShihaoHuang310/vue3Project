<template>
  <div class="department">
    <div class="search">
      <PageSearch :search-config="searchConfig" @search-change="handelSearchChange" @reset-change="handleResetChange" />
    </div>
    <div class="content">
      <PageContent
        :content-config="contentConfig"
        :page-list="pageList"
        @add-click="handleAddClick"
        @edit-click="handleEditClick"
      >
        <template #leader="scope">
          <span class="red">{{ scope.row[scope.prop] }}</span>
        </template>
        <template #parent="scope">
          <span class="blue">{{ scope.row[scope.prop] }}</span>
        </template>
      </PageContent>
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
    <PageModal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system'
import useMainStore from '@/store/main'
import type { ElForm } from 'element-plus'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PagePagination from '@/components/page-pagination/page-pagination.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from './config/modal.config.ts'

import usePageContent from '@/hooks/usePageContent'
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  //获取角色和部门
  const departments = mainStore.entireDepartments.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

const paginationRef = ref<InstanceType<typeof ElForm>>()
const modalRef = ref<InstanceType<typeof ElForm>>()

//发送请求
const systemStore = useSystemStore()
const {
  currentPage,
  pageSize,
  updatePageSize,
  updateCurrentPage,
  fetchPageList,
  handelSearchChange,
  handleResetChange
} = usePageContent(systemStore, 'department')

onMounted(() => {
  fetchPageList()
})
//获取数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//添加
const handleAddClick = () => {
  modalRef.value?.setDialogVisible()
}
//编辑
const handleEditClick = (row: any) => {
  modalRef.value?.setDialogVisible(false, row)
}
</script>

<style scoped lang="less">
.department {
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
  .red {
    color: red;
  }
  .blue {
    color: blue;
  }
}
</style>
