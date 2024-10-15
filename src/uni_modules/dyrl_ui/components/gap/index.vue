<template>
  <div :class="name" :style="[gapStyle, customStyle]"></div>
</template>

<script setup lang="ts">
import { createNamespace, omitByUndefined, addUnit } from "../utils";
import { computed } from "vue";

const [name, bem] = createNamespace("gap");
type Numeric = string | number;

type GapProps = {
  // 背景颜色（默认transparent）
  bgColor?: string;
  // 分割槽高度，单位px（默认10）
  height?: Numeric;
  // 与上一个组件的距离
  marginTop?: Numeric;
  // 与下一个组件的距离
  marginBottom?: Numeric;
  customStyle?: any;
};
const props = withDefaults(defineProps<GapProps>(), {
  bgColor: "transparent",
  height: 10,
});

const gapStyle = computed(() => {
  const style = omitByUndefined({
    backgroundColor: props.bgColor,
    height: addUnit(props.height),
    marginTop: addUnit(props.marginTop),
    marginBottom: addUnit(props.marginBottom),
  });

  return style;
});
</script>

<script lang="ts">
export default {
  name: "rl-gap",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-gap {
  flex-shrink: 0;
}
</style>
