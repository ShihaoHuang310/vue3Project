<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="25">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="menu-content">
      <div class="breadcrumb">
        <HeaderCrumb />
      </div>
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'

const emit = defineEmits(['changeCollapse'])
const isFold = ref(false)
const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emit('changeCollapse', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .menu-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
