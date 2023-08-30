<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="prop.currentPage"
      v-model:page-size="prop.pageSize"
      :background="isBackground"
      :layout="layout"
      :total="total"
      :small="small"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
const prop = defineProps({
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 5
  },
  //尺寸 large middle small
  small: {
    type: String,
    default: 'small'
  },
  //页面分页数量
  pageSizes: {
    type: Array,
    default: () => [5, 10, 20, 30]
  },
  //布局
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  //是否显示背景
  isBackground: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:pageSize', 'update:currentPage'])

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  emit('update:pageSize', val)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  emit('update:currentPage', val)
}
defineExpose({
  handleSizeChange,
  handleCurrentChange
})
</script>

<style scoped lang="less">
.pagination {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
