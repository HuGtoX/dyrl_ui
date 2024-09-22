<template>
  <div
    :class="bem({ borderless: !border, center, clickable })"
    :style="[cellStyle, customStyle]"
    @click="cellClick"
  >
    <slot name="prefix">
      <div v-if="icon" :class="bem('prefix')">
        <Icon :type="icon" />
      </div>
    </slot>

    <div :class="[bem('title'), titleClass]" :style="titleStyle">
      <slot name="title">
        <text>{{ title }}</text>
      </slot>

      <div v-if="label || $slots.label" :class="[bem('label'), labelClass]">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </div>

    <div v-if="value || $slots.value" :class="[bem('value'), valueClass]">
      <slot name="value">
        {{ value }}
      </slot>
    </div>

    <div :class="bem('right-icon')" v-if="arrow || $slots.rightIcon">
      <slot name="rightIcon">
        <Icon v-if="arrow" type="RightOutline" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, omitByUndefined, addUnit } from "../utils";
import Icon from "../Icon/index.vue";
import { computed } from "vue";
const [_, bem] = createNamespace("cell");
type Numeric = string | number;
type CellProps = {
  title?: string;
  value?: string;
  label?: string;
  arrow?: boolean;
  border?: boolean;
  center?: boolean;
  labelClass?: any;
  valueClass?: any;
  titleClass?: any;
  customStyle?: any;
  titleStyle?: any;
  icon?: string;
  clickable?: boolean;
  radius?: Numeric;
};
const props = withDefaults(defineProps<CellProps>(), {
  border: true,
});

const cellStyle = computed(() => {
  return omitByUndefined({
    borderRadius: addUnit(props.radius),
  });
});

const cellClick = () => {};
</script>

<script lang="ts">
export default {
  name: "rl-cell",
  options: {
    styleIsolation: "shared",
    multipleSlots: true,
    virtualHost: true,
  },
};
</script>

<style lang="scss">
@import "../style/mixins/hairline.scss";
.rl-cell {
  --rl-cell-font-size: var(--rl-font-size-md);
  --rl-cell-line-height: 24px;
  --rl-cell-vertical-padding: 10px;
  --rl-cell-horizontal-padding: var(--rl-padding-md);
  --rl-cell-text-color: var(--rl-text-color);
  --rl-cell-background: var(--rl-background-2);
  --rl-cell-border-color: var(--rl-border-color);
  --rl-cell-active-color: var(--rl-active-color);
  --rl-cell-required-color: var(--rl-danger-color);
  --rl-cell-label-color: var(--rl-text-color-2);
  --rl-cell-label-font-size: var(--rl-font-size-sm);
  --rl-cell-label-line-height: var(--rl-line-height-sm);
  --rl-cell-label-margin-top: var(--rl-padding-base);
  --rl-cell-value-color: var(--rl-text-color-2);
  --rl-cell-value-font-size: inherit;
  --rl-cell-icon-size: 16px;
  --rl-cell-right-icon-color: var(--rl-gray-6);
  --rl-cell-large-vertical-padding: var(--rl-padding-sm);
  --rl-cell-large-title-font-size: var(--rl-font-size-lg);
  --rl-cell-large-label-font-size: var(--rl-font-size-md);
  --rl-cell-large-value-font-size: inherit;
  --rl-cell-prefix-margin: var(--rl-padding-sm);

  --rl-cell-hairline-left-padding: var(--rl-padding-md);
  --rl-cell-hairline-right-padding: var(--rl-padding-md);
}
.rl-cell {
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
  box-sizing: border-box;
  border-radius: var(--rl-cell-border-radius);
  padding: var(--rl-cell-vertical-padding) var(--rl-cell-horizontal-padding);
  color: var(--rl-cell-text-color);
  font-size: var(--rl-cell-font-size);
  line-height: var(--rl-cell-line-height);
  background: var(--rl-cell-background);
  align-items: flex-start;

  &--center {
    align-items: center;
  }

  &::after {
    @include hairline-bottom(
      var(--rl-cell-border-color),
      var(--rl-cell-hairline-left-padding),
      var(--rl-cell-hairline-right-padding)
    );
  }

  &:last-child::after,
  &--borderless::after {
    display: none;
  }

  &__label {
    margin-top: var(--rl-cell-label-margin-top);
    color: var(--rl-cell-label-color);
    font-size: var(--rl-cell-label-font-size);
    line-height: var(--rl-cell-label-line-height);
    overflow: hidden;
    word-wrap: break-word;
  }

  &__title,
  &__value {
    flex: 1;
  }

  &__value {
    position: relative;
    overflow: hidden;
    color: var(--rl-cell-value-color);
    font-size: var(--rl-cell-value-font-size);
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
  }

  &__prefix {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: var(--rl-cell-prefix-margin);
  }

  &__right-icon {
    flex-shrink: 0;
    margin-left: var(--rl-padding-base);
    color: var(--rl-cell-right-icon-color);
    font-size: var(--rl-cell-icon-size);
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: var(--rl-cell-active-color);
    }
  }

  &--required {
    overflow: visible;

    &::before {
      position: absolute;
      left: var(--rl-padding-xs);
      color: var(--rl-cell-required-color);
      font-size: var(--rl-cell-font-size);
      content: "*";
    }
  }

  &--large {
    padding-top: var(--rl-cell-large-vertical-padding);
    padding-bottom: var(--rl-cell-large-vertical-padding);

    .rl-cell__title {
      font-size: var(--rl-cell-large-title-font-size);
    }

    .rl-cell__label {
      font-size: var(--rl-cell-large-label-font-size);
    }

    .rl-cell__value {
      font-size: var(--rl-cell-large-value-font-size);
    }
  }
}
</style>
