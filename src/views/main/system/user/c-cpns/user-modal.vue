<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center>
      <div class="form">
        <el-form :model="modalForm" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="modalForm.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="modalForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="modalForm.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="modalForm.cellphone" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="modalForm.roleId" placeholder="请输入选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="modalForm.departmentId" placeholder="请输入选择部门" style="width: 100%">
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
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
const title = ref('新建用户')
const modalForm = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const setDialogVisible = (isNew: boolean, data?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  editData.value = data
  if (!isNew && data) {
    title.value = '编辑用户'
    for (const key in data) {
      modalForm[key] = data[key]
    }
  } else {
    title.value = '新建用户'
    for (const key in data) {
      modalForm[key] = ''
    }
    editData.value = null
  }
}
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData) {
    systemStore.updateUserByIdAction(editData.value.id, modalForm)
  } else {
    //新建用户
    systemStore.addUserAction(modalForm)
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
