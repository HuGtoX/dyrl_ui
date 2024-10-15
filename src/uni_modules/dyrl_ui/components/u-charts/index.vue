<template>
  <div class="canvas-chart-container">
    <canvas canvas-id="myid" id="myid" class="charts" @tap="tap" />
  </div>
</template>

<script setup lang="ts">
import uCharts from "./u-charts/u-charts.min.js";
import { ref, watchEffect, onMounted } from "vue";
import { cloneDeep } from "lodash-es";

type uChartProps = {
  opts?: any;
  chartData?: any;
  type?: "ring" | "column" | "line" | "bar" | "area";
};

const props = defineProps<uChartProps>();
const cWidth = ref(375);
const cHeight = ref(250);
const uChartsInstance = {};

watchEffect(() => {
  if (!props.chartData) return;
  clearChart();
  const data = cloneDeep(props.chartData);
  drawCharts("myid", data);
});
let ctx: any = null;
function drawCharts(id, data) {
  if (!data) return;
  ctx = uni.createCanvasContext(id);
  console.log("data", data);

  uChartsInstance[id] = new uCharts({
    type: props.type,
    context: ctx,
    animation: true,
    type2d: true,
    width: cWidth.value,
    height: cHeight.value,
    ...props.opts,
    ...data,
  });
}

function clearChart() {
  if (ctx && typeof ctx === "object") {
    ctx.clearRect(0, 0, cWidth.value, cHeight.value);
    ctx.draw();
  }
}
const tap = (e) => {
  uChartsInstance[e.target.id].touchLegend(e);
  uChartsInstance[e.target.id].showToolTip(e);
};

onMounted(() => {
  //这里的 750 对应 css .charts 的 width
  cWidth.value = uni.upx2px(750);
  //这里的 500 对应 css .charts 的 height
  cHeight.value = uni.upx2px(500);
});
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.canvas-chart-container {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.charts {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
