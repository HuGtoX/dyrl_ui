<template>
  <div :class="bem([span])" :style="[colStyle]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { useParent } from "../../hooks";
import { ROW_KEY } from "../row";
import { computed } from "vue";

const [_, bem] = createNamespace("col");
const gridNum = 12;
type ColProps = {
  // 占父容器宽度的多少等分，总分为12份
  span?: number;
  // 指定栅格左侧的间隔数(总12栏)
  offset?: number;
  // 水平排列方式，
  justify?: "start" | "end" | "center" | "around" | "between";
  // 垂直对齐方式
  align?: "top" | "center" | "bottom" | "stretch";
  // 文字对齐方式
  textAlign?: string;
};
const props = withDefaults(defineProps<ColProps>(), {
  span: 12,
  offset: 0,
  textAlign: "left",
});

const { parent } = useParent(ROW_KEY);
const colStyle = computed(() => {
  const style: any = {
    paddingLeft: addUnit(Number(parent.props.gutter) / 2),
    paddingRight: addUnit(Number(parent.props.gutter) / 2),
    background: parent?.props.background,
    textAlign: props.textAlign,
    flex: `0 0 ${(100 / gridNum) * props.span}%`,
    marginLeft: (100 / 12) * props.offset + "%",
  };
  return style;
});
</script>

<script lang="ts">
export default {
  name: "rl-col",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-col {
  padding: 0;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  /* #ifdef MP */
  display: block;
  /* #endif */

  &--0 {
    width: 0;
  }

  &--1 {
    width: calc(100% / 12);
  }

  &--2 {
    width: calc(100% / 12 * 2);
  }

  &--3 {
    width: calc(100% / 12 * 3);
  }

  &--4 {
    width: calc(100% / 12 * 4);
  }

  &--5 {
    width: calc(100% / 12 * 5);
  }

  &--6 {
    width: calc(100% / 12 * 6);
  }

  &--7 {
    width: calc(100% / 12 * 7);
  }

  &--8 {
    width: calc(100% / 12 * 8);
  }

  &--9 {
    width: calc(100% / 12 * 9);
  }

  &--10 {
    width: calc(100% / 12 * 10);
  }

  &--11 {
    width: calc(100% / 12 * 11);
  }

  &--12 {
    width: calc(100% / 12 * 12);
  }
}
</style>
