<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center>
      <div class="form">
        <el-form :model="modalForm" label-width="80px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="modalForm.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="modalForm.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="modalForm.parentId" placeholder="请选择上级部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main'
import useSystemStore from '@/store/main/system'
const mainStore = useMainStore()
const systemStore = useSystemStore()
//获取角色和部门
const { entireDepartments } = storeToRefs(mainStore)

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
const title = ref('新建部门')
const modalForm = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const setDialogVisible = (isNew: boolean, data?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  editData.value = data
  if (!isNew && data) {
    title.value = '编辑部门'
    for (const key in data) {
      modalForm[key] = data[key]
    }
  } else {
    title.value = '新建部门'
    for (const key in data) {
      modalForm[key] = ''
    }
    editData.value = null
  }
}
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData) {
    systemStore.updatePageDataAction('department', editData.value?.id, modalForm)
  } else {
    //新建部门
    systemStore.addPageDataAction('department', modalForm)
  }
}
defineExpose({
  setDialogVisible
})
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
