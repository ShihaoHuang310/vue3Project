<template>
  <div class="dashboard">
    <!-- 顶部数据展示 -->
    <el-row :gutter="20">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6"><CountCard v-bind="item" /></el-col>
      </template>
    </el-row>
    <!-- 中间部分 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <UiCard title="分类商品数量(饼图)">
          <PieChart />
        </UiCard>
      </el-col>
      <el-col :span="10">
        <UiCard title="不同城市商品销量">
          <LineChart />
        </UiCard>
      </el-col>
      <el-col :span="7">
        <UiCard title="分类商品数量(玫瑰图)">
          <RoseChart />
        </UiCard>
      </el-col>
    </el-row>
    <!-- 底部 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <UiCard title="分类商品的销量">
          <LineChart />
        </UiCard>
      </el-col>
      <el-col :span="12">
        <UiCard title="分类商品的收藏">
          <LineChart />
        </UiCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import UiCard from '@/base-ui/card.vue'
import CountCard from './c-cpns/count-card/index.vue'
import { PieChart, LineChart, RoseChart } from '@/components/page-echarts'
import useAnalysisStore from '@/store/main/analysis/index.ts'
//发起请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
//获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style scoped lang="less">
.dashboard {
}
</style>
