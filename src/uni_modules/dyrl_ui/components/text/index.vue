<template>
  <div :class="bem([direction, { block, wrap }])" :style="textStyle">
    <slot name="prefix">
      <Icon
        v-if="prefixIcon"
        :type="prefixIcon"
        :size="iconSize ?? addUnit(size)"
        :color="iconColor ?? color"
      />
    </slot>

    <span
      v-if="value || isNumber(value)"
      :class="[bem('value'), `text-line-${line}`]"
    >
      {{ value }}
    </span>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { addUnit, createNamespace, omitByUndefined } from "../utils";
import { isNumber } from "lodash-es";
import { computed } from "vue";
import Icon from "../Icon/index.vue";

const [_, bem] = createNamespace("text");
type Numeric = string | number;
type TextProps = {
  value?: Numeric;
  prefixIcon?: string;
  iconColor?: string;
  iconSize?: Numeric;
  color?: string;
  size?: Numeric;
  block?: boolean;
  wrap?: boolean;
  direction?: "vertical" | "horizontal";
  line?: number;
  marginLeft?: Numeric;
  marginTop?: Numeric;
  fontWeight?: number | string;
};
const props = withDefaults(defineProps<TextProps>(), {
  line: 1,
  direction: "horizontal",
});

const textStyle = computed(() => {
  const style = {
    fontWeight: props.fontWeight,
    fontSize: addUnit(props.size),
    color: props.color,
    marginLeft: addUnit(props.marginLeft),
    marginTop: addUnit(props.marginTop),
  };

  return omitByUndefined(style);
});
</script>
<script lang="ts">
export default {
  name: "rl-text",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
  },
};
</script>
<style lang="scss" scoped>
.rl-text {
  --rl-my-text-font-size: var(--rl-font-size-md);
  --rl-text-gap: 5px;
}

.rl-text {
  display: inline-flex;
  flex-wrap: nowrap;
  gap: var(--rl-text-gap);
  font-size: var(--rl-my-text-font-size);
  color: var(--rl-text-color, #2f343a);
  line-height: var(--rl-text-line-height);
  overflow: hidden;

  &--wrap {
    flex-wrap: wrap;
  }
  &--block {
    width: 100%;
    display: flex;
  }
  &--horizontal {
    align-items: center;
  }
  &--vertical {
    flex-direction: column;
    align-items: center;
  }
}
</style>
