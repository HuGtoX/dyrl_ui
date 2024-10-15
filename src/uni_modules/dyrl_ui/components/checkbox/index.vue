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
          :type="indeterminate ? 'minus1' : 'check'" />

        <div
          v-else
          :class="bem('icon--dot')"
          :style="{
            backgroundColor:
              checked && disabled
                ? 'var( --rl-checkbox-label-disabled-color)'
                : iconBoxStyle?.background,
          }"></div>
      </slot>
    </div>
    <slot>
      <div v-if="label" :class="bem('label')">
        <text>{{ label }}</text>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { computed } from "vue";
import { useParent } from "../../hooks";
import { CHECKBOX_GROUP_KEY } from "../CheckBoxGroup";
import Icon from "../icon/index.vue";

type Numeric = string | number;
type CheckBoxProps = {
  indeterminate?: boolean;
  modelValue?: boolean;
  name?: Numeric;
  disabled?: boolean;
  bindGroup?: boolean;
  shape?: "round" | "square" | "dot";
  iconSize?: string | number;
  checkedColor?: string;
  customStyle?: any;
  checkStyle?: any;
  spread?: boolean;
  label?: string;
};
const [_, bem] = createNamespace("checkbox");
const props = withDefaults(defineProps<CheckBoxProps>(), {
  shape: "square",
  // 默认与复选框组绑定
  bindGroup: true,
});
const emit = defineEmits(["update:modelValue", "change"]);

const { parent } = useParent(CHECKBOX_GROUP_KEY);
const getParentProp = <T,>(name: T) => {
  if (parent && props.bindGroup) {
    return parent.props[name];
  }
};

const innerShape = props.shape || getParentProp("shape");
const innerIconSize = props.iconSize || getParentProp("iconSize") || 18;
const checkClick = () => {
  toggle();
  emit("change");
};

const setParentValue = (checked: boolean) => {
  const { name } = props;
  const { max, modelValue } = parent!.props;
  const value = modelValue.slice();

  if (checked) {
    const overLimit = max && value.length >= +max;

    if (!overLimit && !value.includes(name)) {
      value.push(name);

      if (props.bindGroup) {
        parent!.updateValue(value);
      }
    }
  } else {
    const index = value.indexOf(name);

    if (index !== -1) {
      value.splice(index, 1);

      if (props.bindGroup) {
        parent!.updateValue(value);
      }
    }
  }
};

const checked = computed(() => {
  if (parent && props.bindGroup) {
    return parent.props.modelValue.indexOf(props.name) !== -1;
  }
  return !!props.modelValue;
});

const disabled = computed(() => {
  if (parent && props.bindGroup) {
    const disabled = getParentProp("disabled") || props.disabled;
    const checkedCount = (getParentProp("modelValue") as unknown[]).length;
    const max = getParentProp("max");
    const overLimit = max && checkedCount >= +max;
    return disabled || (overLimit && !checked.value);
  }

  return props.disabled;
});

const toggle = (newValue = !checked.value) => {
  if (disabled.value) return;
  if (parent && props.bindGroup) {
    setParentValue(newValue);
  } else {
    emit("update:modelValue", newValue);
  }
};

const instance = getCurrentInstance();
Object.assign(instance.proxy, { props, checked });

const innerIconColor = computed(() => {
  if (disabled.value && checked.value) {
    return "var(--rl-checkbox-label-disabled-color)";
  }
  if (checked.value) return "#fff";
  return "transparent";
});

const iconBoxStyle = computed(() => {
  const checkedColor =
    props.checkedColor || getParentProp("checkedColor") || "#1989fa";

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
  name: "CheckBox",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-checkbox {
  --rl-checkbox-icon-text-size: var(--rl-font-size-lg);
  --rl-checkbox-icon-border-width: var(--rl-border-width);
  --rl-checkbox-icon-border-color: var(--rl-gray-5);
  --rl-checkbox-icon-color: var(--rl-white);
  --rl-checkbox-label-margin-left: 8px;
  --rl-checkbox-label-margin-right: 12px;
  --rl-checkbox-icon-margin-right: 10px;
  --rl-checkbox-label-color: var(--rl-main-text-color);
  --rl-checkbox-label-font-size: var(--rl-font-size-md);
  --rl-checkbox-label-disabled-color: var(--rl-gray-5);
  --rl-checkbox-label-disabled-background: var(--rl-gray-2);
  --rl-checkbox-dot-size: 8px;
  --rl-checkbox-radius: var(--rl-radius-sm);
  --rl-checkbox-round-radius: var(--rl-radius-max);
  --rl-checkbox-duration: 300;
}

.rl-checkbox {
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
    .rl-checkbox__label {
      color: var(--rl-checkbox-label-disabled-color);
    }
  }

  &--round {
    .rl-checkbox__icon {
      border-radius: var(--rl-checkbox-round-radius);
      overflow: hidden;
    }
  }
  &--square {
    .rl-checkbox__icon {
      border-radius: var(--rl-checkbox-radius);
    }
  }

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    text-align: center;
    font-size: var(--rl-checkbox-icon-text-size);
    border-width: var(--rl-checkbox-icon-border-width);
    border-color: var(--rl-checkbox-icon-border-color);
    margin-right: var(--rl-checkbox-icon-margin-right);
    border-style: solid;
    box-sizing: content-box;
    overflow: hidden;

    &--dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      height: calc(100% - var(--rl-checkbox-dot-size));
      width: calc(100% - var(--rl-checkbox-dot-size));
      transition-duration: var(--rl-checkbox-duration);
      transition-property: background-color;
    }
  }

  &__label {
    display: flex;
    /* #ifndef APP-NVUE */
    word-wrap: break-word;
    /* #endif */
    margin-right: var(--rl-checkbox-label-margin-right);
    color: var(--rl-checkbox-label-color);
    font-size: var(--rl-checkbox-label-font-size);
    &--disabled {
      color: var(--rl-checkbox-label-disabled-color);
    }
  }
}
</style>
