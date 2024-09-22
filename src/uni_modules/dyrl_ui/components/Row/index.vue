<template>
  <div :class="bem({ wrap })" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { useChildren } from "../../hooks";
import { ROW_KEY } from ".";
import { computed } from "vue";

const [name, bem] = createNamespace("row");
type Numeric = string | number;
type RowProps = {
  // 给col添加间距，左右边距各占一半
  gutter?: Numeric;
  // 水平排列方式
  justify?: "start" | "end" | "center" | "around" | "between";
  // 垂直对齐方式，可选值为top、center、bottom
  align?: "top" | "center" | "bottom";
  background?: string;
  wrap?: boolean;
};
const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  align: "center",
});

const { linkChildren } = useChildren(ROW_KEY);
linkChildren({ props });

const rowStyle = computed(() => {
  const style: any = {
    alignItems: props.align,
    justifyContent: props.justify,
  };

  // 水平排列方式
  if (props.justify == "end" || props.justify == "start") {
    style["justifyContent"] = "flex-" + props.justify;
  }
  if (props.justify == "around" || props.justify == "between") {
    style["justifyContent"] = "space-" + props.justify;
  }

  // 垂直对齐方式
  if (props.align == "top") style["alignItems"] = "flex-start";
  if (props.align == "bottom") style["alignItems"] = "flex-end";

  // 通过给uv-row左右两边的负外边距，消除col在有gutter时，第一个和最后一个元素的左内边距和右内边距造成的影响
  if (props.gutter) {
    style["marginLeft"] = addUnit(-Number(props.gutter) / 2);
    style["marginRight"] = addUnit(-Number(props.gutter) / 2);
  }
  return style;
});
</script>

<script lang="ts">
export default {
  name: "Row",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-row {
  display: flex;

  &--wrap {
    flex-wrap: wrap;
  }
}
</style>
