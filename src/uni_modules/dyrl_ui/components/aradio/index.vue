<template>
  <div
    :style="customStyle"
    @click.stop="checkClick"
    :class="bem([innerShape, { disabled, spread }])">
    <div
      :style="[
        checkStyle,
        innerShape !== 'dot' && iconBoxStyle,
        { width: addUnit(innerIconSize), height: addUnit(innerIconSize) },
      ]"
      :class="bem('icon')">
      <slot name="icon">
        <Icon
          v-if="innerShape !== 'dot'"
          :color="innerIconColor"
          type="check" />
        <div
          v-else
          :class="bem('icon--dot')"
          :style="{
            backgroundColor:
              checked && disabled
                ? 'var( --rl-radio-label-disabled-color)'
                : iconBoxStyle?.background,
          }"></div>
      </slot>
    </div>
    <slot>
      <div v-if="label" :class="bem('label')">
        <span>{{ label }}</span>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { computed, getCurrentInstance } from "vue";
import { useParent } from "../../hooks";
import { RADIO_GROUP_KEY } from "../Radio-Group";
import Icon from "../Icon";

type Numeric = string | number;
type RadioBoxProps = {
  modelValue?: boolean;
  name: Numeric;
  disabled?: boolean;
  bindGroup?: boolean;
  shape?: "round" | "dot";
  customStyle?: any;
  checkStyle?: any;
  checkedColor?: string;
  spread?: boolean;
  iconSize?: Numeric;
  iconColor?: string;
  label?: string;
  size?: Numeric;
};
const [_, bem] = createNamespace("radio");
const props = withDefaults(defineProps<RadioBoxProps>(), {
  // 默认与复选框组绑定
  bindGroup: true,
});
const emit = defineEmits(["update:modelValue", "change"]);

const { parent } = useParent(RADIO_GROUP_KEY);
const checkClick = () => {
  toggle();
  emit("change");
};
const getParentProp = <T,>(name: T) => {
  if (parent && props.bindGroup) {
    return parent.props[name];
  }
};
const checked = computed(() => {
  const value = parent ? parent.props.modelValue : props.modelValue;
  return value === props.name;
});

const disabled = computed(() => {
  if (parent && props.bindGroup) {
    const disabled = getParentProp("disabled") || props.disabled;
    return disabled;
  }
  return props.disabled;
});

const toggle = () => {
  if (disabled.value) return;
  if (parent) {
    parent!.updateValue(props.name);
  } else {
    emit("update:modelValue", props.name);
  }
};

const instance = getCurrentInstance();
Object.assign(instance?.proxy!, { props, checked });

const innerIconSize = props.iconSize || getParentProp("iconSize");
const innerShape = props.shape || getParentProp("shape");
const innerIconColor = computed(() => {
  if (disabled.value && checked.value) {
    return "var(--rl-radio-label-disabled-color)";
  }
  if (checked.value) return "#fff";
  return "transparent";
});

const iconBoxStyle = computed(() => {
  const checkedColor = props.checkedColor || getParentProp("checkedColor");
  if (checkedColor && checked.value && !disabled.value) {
    return {
      background: checkedColor,
      borderColor: checkedColor,
    };
  }
});

defineExpose({
  toggle,
  checked,
});
</script>

<script lang="ts">
export default {
  name: "rl-radio",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-radio {
  --rl-radio-icon-text-size: var(--rl-font-size-lg);
  --rl-radio-icon-border-width: var(--rl-border-width);
  --rl-radio-icon-border-color: var(--rl-gray-5);
  --rl-radio-icon-color: var(--rl-white);
  --rl-radio-label-margin-left: 8px;
  --rl-radio-label-margin-right: 12px;
  --rl-radio-icon-margin-right: 10px;
  --rl-radio-label-color: var(--rl-main-text-color);
  --rl-radio-label-font-size: var(--rl-font-size-md);
  --rl-radio-label-disabled-color: var(--rl-gray-5);
  --rl-radio-label-disabled-background: var(--rl-gray-3);
  --rl-radio-dot-size: 8px;
  --rl-radio-radius: var(--rl-radius-sm);
  --rl-radio-round-radius: var(--rl-radius-max);
}

.rl-radio {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  &--spread {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  &--disabled {
    cursor: not-allowed;
    .rl-radio__label {
      color: var(--rl-radio-label-disabled-color);
    }
    .rl-radio__icon {
      background: var(--rl-radio-label-disabled-background);
    }
  }

  &--square {
    .rl-radio__icon {
      border-radius: var(--rl-radio-radius);
    }
  }

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    text-align: center;
    font-size: var(--rl-radio-icon-text-size);
    border-width: var(--rl-radio-icon-border-width);
    border-color: var(--rl-radio-icon-border-color);
    margin-right: var(--rl-radio-icon-margin-right);
    border-style: solid;
    box-sizing: content-box;
    border-radius: var(--rl-radio-round-radius);
    overflow: hidden;

    &--dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      height: calc(100% - var(--rl-radio-dot-size));
      width: calc(100% - var(--rl-radio-dot-size));
      transition-duration: var(--rl-radio-duration);
      transition-property: background-color;
    }
  }

  &__label {
    display: flex;
    /* #ifndef APP-NVUE */
    word-wrap: break-word;
    /* #endif */
    margin-right: var(--rl-radio-label-margin-right);
    color: var(--rl-radio-label-color);
    font-size: var(--rl-radio-label-font-size);
    &--disabled {
      color: var(--rl-radio-label-disabled-color);
    }
  }
}
</style>
