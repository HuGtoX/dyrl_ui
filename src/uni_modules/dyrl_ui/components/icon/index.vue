<template>
  <span
    :class="['iconfont', `icon-${type}`, bem({ spin })]"
    :style="
      omitByUndefined({ fontSize: addUnit(size), '--rl-icon-color': color })
    "></span>
</template>

<script setup lang="ts">
import {
  addUnit,
  type Numeric,
  createNamespace,
  omitByUndefined,
} from "../utils";

const [_, bem] = createNamespace("icon");
type iconProps = {
  type: string;
  spin?: boolean;
  size?: Numeric;
  color?: string;
};

defineProps<iconProps>();
</script>

<script lang="ts">
export default {
  options: {
    name: "rl-icon",
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<style lang="scss">
@import "./iconfont.css";
.rl-icon {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  // line-height: 1;
  color: var(--rl-icon-color);
  font-size: inherit;

  &::before {
    position: relative;
    display: inline-block;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-weight: normal;
    font-style: normal;
    line-height: 1;
  }

  &--spin:before {
    display: inline-block;
    animation: loadingCircle 1s infinite linear;
  }
}

@keyframes loadingCircle {
  to {
    transform: rotate(360deg);
  }
}
</style>
