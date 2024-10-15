<template>
  <div
    :style="[tagStyle, customStyle]"
    :class="bem([type, size, shape, { disabled, border, plain }])"
  >
    <slot name="prefix">
      <Icon v-if="icon" :type="icon" />
    </slot>

    <span
      :class="[bem('text', [size]), 'text-line-1']"
      :style="defaultSlotStyle"
    >
      <slot></slot>
    </span>

    <slot name="extra">
      <Icon v-if="close" @tap="() => emit('close')" type="CloseOutline" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import Icon from "../Icon/index.vue";
import { createNamespace, omitByUndefined, addUnit } from "../utils";
import { computed } from "vue";

const [_, bem] = createNamespace("tag");
type TagProps = {
  type?: "default" | "warning" | "success" | "error" | "primary";
  size?: "small" | "mini" | "large";
  shape?: "round" | "square" | "semicircle";
  icon?: string;
  close?: boolean;
  plain?: boolean;
  border?: boolean;
  borderRadius?: any;
  disabled?: boolean;
  color?: any;
  borderColor?: any;
  background?: any;
  customStyle?: any;
};
const props = withDefaults(defineProps<TagProps>(), {
  type: "default",
  shape: "round",
  size: "small",
});
const emit = defineEmits(["close"]);

const tagStyle = computed(() =>
  omitByUndefined({
    background: props.background,
    color: props.color,
    borderColor: props.borderColor,
    borderRadius: addUnit(props.borderRadius),
  }),
);

const defaultSlotStyle = computed(() => {
  let style: any = {};
  if (props.icon) style["marginLeft"] = "3px";
  if (props.close) style["marginRight"] = "3px";
  return style;
});
</script>

<script lang="ts">
export default {
  name: "rl-tag",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-tag {
  --rl-tag-default-color: rgba(0, 0, 0, 0.88);
  --rl-tag-default-background: #fafafa;
  --rl-tag-default-border-color: #d9d9d9;

  --rl-tag-primary-color: #1677ff;
  --rl-tag-primary-background: #c7e0ff;
  --rl-tag-primary-border-color: #91caff;

  --rl-tag-warning-color: #faad14;
  --rl-tag-warning-background: #fffbe6;
  --rl-tag-warning-border-color: #ffe58f;

  --rl-tag-success-color: #52c41a;
  --rl-tag-success-background: #f6ffed;
  --rl-tag-success-border-color: #b7eb8f;

  --rl-tag-error-color: #ff4d4f;
  --rl-tag-error-background: #fff2f0;
  --rl-tag-error-border-color: #fff2f0;

  --rl-tag-round-radius: 100px;
  --rl-tag-square-radius: 3px;
}

.rl-tag {
  flex-shrink: 0;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &__text {
    &--mini {
      font-size: 11px;
    }

    &--small {
      font-size: 13px;
    }

    &--large {
      font-size: 15px;
    }
  }
  &--semicircle {
    border-radius: var(--rl-tag-round-radius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &--round {
    border-radius: var(--rl-tag-round-radius);
  }

  &--square {
    border-radius: var(--rl-tag-square-radius);
  }

  &--default {
    color: var(--rl-tag-default-color);
    background: var(--rl-tag-default-background);
  }

  &--primary {
    color: var(--rl-tag-primary-color);
    background: var(--rl-tag-primary-background);
  }

  &--warning {
    color: var(--rl-tag-warning-color);
    background: var(--rl-tag-warning-background);
  }

  &--success {
    color: var(--rl-tag-success-color);
    background: var(--rl-tag-success-background);
  }

  &--error {
    color: var(--rl-tag-error-color);
    background: var(--rl-tag-error-background);
  }

  &--plain {
    background: transparent;
  }
  &--border,
  &--plain {
    &.rl-tag--default {
      border: 0.5px solid var(--rl-tag-default-border-color);
    }

    &.rl-tag--primary {
      border: 0.5px solid var(--rl-tag-primary-border-color);
    }

    &.rl-tag--success {
      border: 0.5px solid var(--rl-tag-success-border-color);
    }

    &.rl-tag--warning {
      border: 0.5px solid var(--rl-tag-warning-border-color);
    }

    &.rl-tag--error {
      border: 0.5px solid var(--rl-tag-error-border-color);
    }
  }

  &--large {
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
  }

  &--small {
    padding: 0 12px;
    height: 24px;
    line-height: 24px;
  }

  &--mini {
    padding: 0 10px;
    height: 19px;
    line-height: 19px;
  }
}
</style>
