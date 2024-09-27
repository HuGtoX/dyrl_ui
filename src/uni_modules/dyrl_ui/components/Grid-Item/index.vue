<template>
  <div :class="`${classPrefix}-item`" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>
<script setup lang="ts">
import { computed } from "vue";

const classPrefix = `rl-grid`;
type GridItemProps = {
  span?: number;
  style?: any;
};
const props = withDefaults(defineProps<GridItemProps>(), { span: 1 });
const style = computed(() => {
  const style = {};
  style["--item-span"] = props.span;
  return style;
});
</script>

<style lang="scss">
$class-prefix-grid: "rl-grid";
.#{$class-prefix-grid} {
  &-item {
    grid-column-end: span var(--item-span);
  }
}
</style>
