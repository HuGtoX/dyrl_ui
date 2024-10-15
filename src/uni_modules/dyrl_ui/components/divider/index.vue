<template>
  <div :class="bem([direction])">
    <div v-if="$slots.default && direction !== 'vertical'">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";

const [_, bem] = createNamespace("divider");
type DividerProps = {
  direction?: "horizontal" | "vertical";
  contentPosition?: "left" | "center" | "right";
  borderStyle?: string;
};
withDefaults(defineProps<DividerProps>(), {
  direction: "vertical",
  borderStyle: "solid",
});
</script>

<script lang="ts">
export default {
  name: "Divider",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-divider {
  --rl-divider-border-color: #5c6269;
  --rl-divider-border-style: solid;
}
.rl-divider {
  position: relative;
  background: transparent;

  &--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    border-top: 1px var(--rl-divider-border-color)
      var(--rl-divider-border-style);
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    margin: 0 8px;
    height: 0.8em;
    vertical-align: middle;
    position: relative;
    border-left: 1px var(--rl-divider-border-color)
      var(--rl-divider-border-style);
  }
}
</style>
