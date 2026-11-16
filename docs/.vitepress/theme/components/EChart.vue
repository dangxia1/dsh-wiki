<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  option: Record<string, unknown>
  height?: string
}>()

// 组件根元素始终渲染；echarts 只在 onMounted（仅客户端执行）里初始化，
// 因此天然 SSR 安全，不需要 ClientOnly 包裹（包了反而有 ref 时序问题）
const el = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null
let observer: ResizeObserver | null = null

onMounted(() => {
  if (!el.value) return
  chart = echarts.init(el.value)
  chart.setOption(props.option)
  observer = new ResizeObserver(() => chart?.resize())
  observer.observe(el.value)
})

watch(
  () => props.option,
  (o) => chart?.setOption(o, true),
  { deep: true },
)

onBeforeUnmount(() => {
  observer?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div ref="el" class="echart" :style="{ height: height || '360px' }" />
</template>

<style scoped>
.echart {
  width: 100%;
}
</style>
