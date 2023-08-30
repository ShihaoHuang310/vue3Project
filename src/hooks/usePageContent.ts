import { ref } from 'vue'
const usePageContent = (store: any, pageName: string) => {
  const currentPage = ref(1)
  const pageSize = ref(10)
  //发起网络请求
  const fetchPageList = (formData: any = {}) => {
    // 获取offset/size
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageParams = { offset, size }
    const queryInfo = { ...pageParams, ...formData }
    store.postPageListAction(pageName, queryInfo)
  }
  // 分页:
  const updatePageSize = (val: number) => {
    pageSize.value = val
    fetchPageList()
  }

  const updateCurrentPage = (val: number) => {
    console.log('updateCurrentPage--------', val)
    currentPage.value = val
    fetchPageList()
  }

  //查询
  const handelSearchChange = (form: any) => {
    fetchPageList(form)
  }
  //重置
  const handleResetChange = () => {
    fetchPageList()
  }
  return {
    currentPage,
    pageSize,
    updatePageSize,
    updateCurrentPage,
    fetchPageList,
    handelSearchChange,
    handleResetChange
  }
}

export default usePageContent
