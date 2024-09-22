<template>
  <div :style="textareaStyle" :class="bem({ disabled, readOnly })">
    <textarea
      :value="value"
      @input="$emit('update:value', $event.detail?.value)"
      :disabled="disabled || readOnly"
      :placeholder="placeholder"
      :class="bem('element')"
      :auto-height="!rows"
    />
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { type CSSProperties } from "vue";
type TextAreaProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
};
defineEmits(["update:value"]);
const props = withDefaults(defineProps<TextAreaProps>(), {
  placeholder: "请输入",
});

const [name, bem] = createNamespace("textarea");

const textareaStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.rows) {
    style.height = addUnit(props.rows * 24);
  }
  return style;
});
</script>
<script lang="ts">
export default {
  name: "Textarea",
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
$class-prefix-textarea: "rl-textarea";

.rl-textarea {
  --font-size: var(--rl-font-size-6);
  --color: var(--rl-color-text);
  --placeholder-color: var(--rl-color-light);
  --background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  min-height: 24px;
  background-color: var(--background-color);

  &--disabled {
    opacity: var(--rl-input-opacity, 0.4);
    cursor: not-allowed;
    --color: var(--rl-disabled-text-color);
    --placeholder-color: var(--rl-disabled-text-color);
  }
  &--readOnly {
    --color: var(--rl-read-only-color);
    cursor: not-allowed;
  }

  &__element {
    flex: auto;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    min-width: 200px;
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
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    min-height: 1.5em;
    text-align: var(--rl-input-text-align);

    :deep(.uni-textarea-placeholder) {
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

    &::-webkit-search-cancel-button {
      display: none;
    }

    &::-webkit-search-decoration {
      display: none;
    }

    &:disabled {
      opacity: 1;
    }

    &[readonly] {
      pointer-events: none;
    }
  }
}
</style>
