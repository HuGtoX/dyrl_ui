<template>
  <div :class="`${name}-item`" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { createNamespace } from "../utils";

const [name, bem] = createNamespace("grid");

type GridItemProps = {
  span?: number | string;
  style?: CSSProperties;
};
const props = withDefaults(defineProps<GridItemProps>(), { span: 1 });
const style = computed(() => {
  const style: CSSProperties = {};
  style["--item-span"] = props.span;
  return style;
});
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-grid {
  &-item {
    grid-column-end: span var(--item-span);
  }
}
</style>
