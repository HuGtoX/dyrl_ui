<template>
  <div :class="bem([direction])">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import { useChildren } from "../../hooks";
import { RADIO_GROUP_KEY } from "./index";
import { watch } from "vue";

const [name, bem] = createNamespace("radio-group");

type Numeric = string | number;
type RadioGroupProps = {
  shape?: "square" | "dot";
  disabled?: boolean;
  iconSize?: Numeric;
  direction?: "vertical" | "horizontal";
  modelValue?: string | number;
  checkedColor?: string;
};
const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: "vertical",
  checkedColor: "#1989fa",
  iconSize: 18,
});

const emit = defineEmits(["update:modelValue", "change"]);
const { linkChildren } = useChildren(RADIO_GROUP_KEY);
const updateValue = (value: unknown[]) => emit("update:modelValue", value);

watch(
  () => props.modelValue,
  (value) => emit("change", value)
);

linkChildren({ props, updateValue });
</script>

<script lang="ts">
export default {
  name: "rl-radio-group",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-radio-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
