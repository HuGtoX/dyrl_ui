<template>
  <div :class="bem(['vertical'])">
    <div :class="bem('circle-container')">
      <slot name="active-icon">
        <Icon :size="iconSize" :color="iconColor" :type="iconType" />
      </slot>
    </div>
    <div :class="bem('content')">
      <div v-if="title" :class="bem('content__title')">
        {{ title }}
      </div>
      <slot></slot>
    </div>
    <div :class="bem('line')" :style="lineStyle"></div>
  </div>
</template>

<script setup lang="ts">
import Icon from "../icon/index.vue";
import { createNamespace, addUnit } from "../utils";
import { useParent } from "../../hooks";
import { STEPS_KEY } from "../steps";

type Steps = {
  title?: string;
};
defineProps<Steps>();
const { parent, index } = useParent(STEPS_KEY);
const [_, bem] = createNamespace("step");

const getStatus = () => {
  const active = +parent.props.active;
  if (index.value < active) {
    return "finish";
  }
  return index.value === active ? "process" : "waiting";
};

const iconColor = computed(() => {
  if (getStatus() === "waiting") return parent.props.inactiveColor;
  return parent.props.activeColor;
});
const iconSize = computed(() => {
  if (getStatus() === "process") return 15;
  return parent.props.iconSize;
});
const iconType = computed(() => {
  if (getStatus() === "process") return "success-fill";
  return "steps-spot";
});

const lineStyle = computed(() => ({
  background:
    getStatus() === "finish"
      ? parent.props.activeColor
      : parent.props.inactiveColor,
}));
</script>

<script lang="ts">
export default {
  name: "Step",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-step {
  position: relative;
  flex: 1;

  &--vertical {
    display: block;
    float: none;
    padding: 10px 10px 10px 0;
    line-height: var(--rl-line-height-sm, 18px);
  }

  &__content {
    margin-bottom: 12px;
    &__title {
      color: var(--rl-step-title-color, #2f343a);
      font-size: var(--rl-step-title-size, 15px);
      margin-bottom: 6px;
    }
  }

  &:last-child {
    .rl-step__line {
      width: 0;
    }
  }

  &__line {
    position: absolute;
    top: 16px;
    left: -15px;
    width: 1px;
    height: 100%;
    background-color: var(--rl-step-line-color, #ebedf0);
  }

  &__circle-container {
    z-index: 1;
    position: absolute;
    top: 19px;
    left: -15px;
    font-size: var(--rl-step-icon-size, 14px);
    line-height: 1;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}
</style>
