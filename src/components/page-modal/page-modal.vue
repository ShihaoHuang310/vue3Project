<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.addTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form size="large" :model="modalForm" label-width="80px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="modalForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="modalForm[item.prop]"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  style="width: 100%"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="modalForm[item.prop]" :placeholder="item.placeholder" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import type { IProps } from './type.ts'
import useSystemStore from '@/store/main/system'

const props = defineProps<IProps>()

const systemStore = useSystemStore()

const dialogVisible = ref(false)
const isNewRef = ref(false)
const editData = ref()
const initForm: any = {}
for (const key in props.modalConfig.formItems) {
  initForm[key.prop] = key.initialValue ?? ''
}

const modalForm = reactive<any>(initForm)
const setDialogVisible = (isNew: boolean, data?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  editData.value = data
  if (!isNew && data) {
    for (const key in data) {
      modalForm[key] = data[key]
    }
    editData.value = data
  } else {
    for (const key in data) {
      modalForm[key] = ''
    }
    editData.value = null
  }
}
const handleConfirmClick = () => {
  dialogVisible.value = false
  let infoData = modalForm
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    systemStore.updatePageDataAction(props.modalConfig.pageName, editData.value?.id, infoData)
    infoData.value = infoData
  } else {
    //新建部门
    systemStore.addPageDataAction(props.modalConfig.pageName, infoData)
    infoData.value = {}
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
