<template>
  <div :style="[inputStyle]" :class="bem({ disabled, readOnly })">
    <input
      :type="type"
      :disabled="disabled || readOnly"
      :readonly="readOnly"
      :value="value"
      :placeholder="placeholder"
      :class="bem('element')"
      @input="inputEmit"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "Input",
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { addUnit, createNamespace } from "../utils";

const classPrefix = `rl-input`;
const [name, bem] = createNamespace("input");
type Numeric = string | number;
type InputProps = {
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "number" | "safe-password";
  value?: string | number;
  readOnly?: boolean;
  inputWidth?: Numeric;
};
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  placeholder: "请输入",
});

const emit = defineEmits(["update:value"]);

const inputEmit = (event: any) => {
  let value = event.target?.value || event.detail?.value;
  if (props.type === "number" && value) value = Number(value);
  emit("update:value", value);
};

const inputStyle = computed(() => {
  const style = {};
  // if (props.readOnly) style["backgroundColor"] = "#fff";
  if (props.inputWidth) style["width"] = addUnit(props.inputWidth);
  return style;
});
</script>

<style lang="scss">
.rl-input {
  --font-size: var(--rl-font-size-6);
  --color: var(--rl-color-text);
  --placeholder-color: var(--rl-color-light);
  --background-color: transparent;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  min-height: 24px;
  background-color: var(--background-color);

  &--readOnly {
    --color: var(--rl-read-only-color);
    cursor: not-allowed;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--rl-input-opacity, 0.6);
    --color: var(--rl-disabled-text-color);
    --placeholder-color: var(--rl-disabled-text-color);
  }
}

.rl-input__element {
  flex: auto;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  color: var(--color);
  font-size: var(--font-size);
  line-height: 1.5;
  background: transparent;
  border: 0;
  outline: none;
  appearance: none;
  min-height: 1.5em;
  text-align: var(--rl-input-text-align);

  :deep(.uni-input-placeholder) {
    opacity: var(--rl-input-opacity, 0.8);
  }

  &:-webkit-autofill {
    background-color: transparent;
  }

  &:read-only {
    cursor: default;
  }

  &:invalid {
    box-shadow: none;
  }

  &::-ms-clear {
    display: none;
  }

  &::-ms-reveal {
    display: none;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::-webkit-search-decoration {
    display: none;
  }

  &:disabled {
    opacity: 1;
  }

  // for ios
  &[type="date"],
  &[type="time"],
  &[type="datetime-local"] {
    min-height: 1.5em;
  }

  // for safari
  &[type="search"] {
    -webkit-appearance: none;
  }

  &[readonly] {
    pointer-events: none;
  }
}
</style>
