<template>
  <div class="base-echarts" ref="echartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
console.log('props', props.options)

const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartsInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })
  echartsInstance.setOption(props.option ?? {})
})
</script>

<style scoped lang="less">
.base-echarts {
  height: 300px;
}
</style>
