<template>
  <div :class="[bem([direction])]">
    <div :class="bem('items')">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import { useChildren } from "../../hooks";
import { STEPS_KEY } from ".";

const [name, bem] = createNamespace("steps");

const props = withDefaults(
  defineProps<{
    active?: number;
    direction?: "horizontal" | "vertical";
    inactiveColor?: string;
    activeColor?: string;
    iconSize?: number | string;
  }>(),
  {
    direction: "vertical",
    inactiveColor: "#1BC896",
    activeColor: "#0173FC",
    iconSize: 10,
  }
);
const { linkChildren } = useChildren(STEPS_KEY);
linkChildren({ props });
</script>

<script lang="ts">
export default {
  name: "Steps",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-steps {
  overflow: hidden;
  background-color: var(--rl-steps-background);

  &--horizontal {
    padding: 10px 10px 0;

    .rl-steps-items {
      position: relative;
      display: flex;
      margin: 0 0 10px;
      padding-bottom: 22px;
    }
  }

  &--vertical {
    padding: 0 0 0 var(--rl-padding-xl, 32px);
  }
}
</style>
