<template>
  <div :class="name" :style="style">
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
import { addUnit, createNamespace } from "../utils";

type GridProps = {
  columns: number | string;
  gap?: number | string | [number | string, number | string];
};
const [name] = createNamespace("grid");
const props = withDefaults(defineProps<GridProps>(), {});
const style = computed(() => {
  const { gap } = props;
  const style = {};
  style["--columns"] = props.columns.toString();
  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style["--gap-horizontal"] = addUnit(gap[0]);
      style["--gap-vertical"] = addUnit(gap[1]);
    } else {
      style["--gap"] = addUnit(gap);
    }
  }
  return style;
});
</script>

<style lang="scss">
$class-prefix-grid: "rl-grid";

.rl-grid {
  --gap: 0;
  --gap-horizontal: var(--gap);
  --gap-vertical: var(--gap);

  display: grid;
  grid-gap: 10px;
  column-gap: var(--gap-horizontal);
  row-gap: var(--gap-vertical);
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  align-items: stretch;

  &-item {
    grid-column-end: span var(--item-span);
  }
}
</style>
