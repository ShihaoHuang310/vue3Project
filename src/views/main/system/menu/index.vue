<template>
  <div class="menu">
    <PageContent :page-list="pageList" :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system'

import PageContent from '@/components/page-content/page-content.vue'

import contentConfig from './config/content.config.ts'
import usePageContent from '@/hooks/usePageContent'

const systemStore = useSystemStore()
const { fetchPageList } = usePageContent(systemStore, 'menu')
//获取数据
const { pageList } = storeToRefs(systemStore)
onMounted(() => {
  fetchPageList()
})
</script>

<style scoped lang="less"></style>
