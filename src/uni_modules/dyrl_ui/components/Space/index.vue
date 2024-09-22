<template>
  <div
    :class="
      bem({
        [direction]: direction,
        [`align-${mergedAlign}`]: mergedAlign,
        wrap: wrap,
        fill: fill,
      })
    "
    :style="spaceStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { addUnit, createNamespace } from "../utils";
import { computed } from "vue";

type Numeric = string | number;
const [_, bem] = createNamespace("space");
type SpaceProps = {
  direction?: "vertical" | "horizontal";
  align?: "start" | "end" | "center" | "baseline";
  fill?: boolean;
  wrap?: boolean;
  size?: Numeric | Numeric[];
};
const props = withDefaults(defineProps<SpaceProps>(), {
  direction: "horizontal",
});

const mergedAlign = computed(
  () => props.align ?? (props.direction === "horizontal" ? "center" : ""),
);

const spaceStyle = computed(() => {
  if (Array.isArray(props.size)) {
    return { gap: props.size.map((item) => addUnit(item)).join(" ") };
  }
  return { gap: addUnit(props.size) };
});
</script>

<script lang="ts">
export default {
  name: "rl-space",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-space {
  display: inline-flex;

  &--horizontal {
    .rl-space-item {
      display: flex;
      align-items: center;
    }
  }

  &--vertical {
    flex-direction: column;
  }

  &--align-baseline {
    align-items: baseline;
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-center {
    align-items: center;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--fill {
    display: flex;
  }
}
</style>
