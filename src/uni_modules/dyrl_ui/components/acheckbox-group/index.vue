<template>
  <div :class="bem([direction])">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import { useChildren } from "../../hooks";
import { CHECKBOX_GROUP_KEY } from "./index";
import { watch } from "vue";

const [name, bem] = createNamespace("checkbox-group");
type CheckboxGroupToggleAllOptions =
  | boolean
  | {
      checked?: boolean;
      skipDisabled?: boolean;
    };

type Numeric = string | number;
type CheckboxGroupProps = {
  max?: Numeric;
  shape?: "round" | "square";
  disabled?: boolean;
  iconSize?: Numeric;
  direction?: "vertical" | "horizontal";
  modelValue?: any[];
  checkedColor?: string;
};
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  direction: "vertical",
  shape: "square",
  checkedColor: "#1989fa",
  iconSize: 18,
});

const emit = defineEmits(["update:modelValue", "change"]);
const { linkChildren, children } = useChildren(CHECKBOX_GROUP_KEY);
const updateValue = (value: unknown[]) => emit("update:modelValue", value);

const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
  let name = props.modelValue || [];
  if (typeof options === "boolean") {
    options = { checked: options };
  }

  const { checked, skipDisabled } = options;

  // 保留除了当前checklist外的name
  const childName = children.map((item) => item.name);
  name = name.filter((item) => {
    return !childName.includes(item);
  });

  const checkedChildren = children.filter((item: any) => {
    if (!item.props?.bindGroup) {
      return false;
    }

    if (item.props?.disabled && skipDisabled) {
      return item.checked.value;
    }
    return checked ?? !item.checked.value;
  });

  const names = name.concat(checkedChildren.map((item: any) => item.name));
  updateValue(names);
};

watch(
  () => props.modelValue,
  (value) => emit("change", value),
);

linkChildren({ props, updateValue });

defineExpose({
  toggleAll,
});
</script>

<script lang="ts">
export default {
  name: "rl-checkbox-group",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-checkbox-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
