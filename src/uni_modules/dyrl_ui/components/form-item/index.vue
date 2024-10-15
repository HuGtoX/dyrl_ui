<template>
  <uni-forms-item
    :class="bem({ disabled })"
    :name="name"
    :rules="rules"
    :style="{ '--rl-input-text-align': `${innerInputAlign}` }">
    <!-- 表单组件布局为flex-row -->
    <Cell
      :style="cellStyle"
      :titleStyle="labelStyle"
      v-if="labelAlign === 'left'">
      <template #prefix>
        <div v-if="isRequired" class="text-danger">*</div>
      </template>

      <template #title>
        <slot name="label">
          <span>{{ label }}</span>
        </slot>
      </template>

      <template #value>
        <slot></slot>
      </template>

      <template #rightIcon>
        <slot name="extra">
          <Icon v-if="arrow" type="RightOutline"></Icon>
        </slot>
      </template>
    </Cell>

    <!-- 表单组件布局为flex-col -->
    <Cell
      :titleStyle="{ width: '100%' }"
      :clickable="clickable"
      :style="cellStyle"
      v-if="labelAlign === 'top'">
      <template #prefix>
        <div v-if="isRequired" class="text-danger">*</div>
      </template>

      <template #title>
        <div @click="headerClick" :class="bem('header')">
          <div :class="bem('title')">{{ label }}</div>
          <div :class="bem('extra')">
            <slot name="extra">
              <Icon
                v-if="arrow"
                color="var(--rl-cell-right-icon-color)"
                type="RightOutline"></Icon>
            </slot>
          </div>
        </div>
      </template>

      <template #label>
        <slot></slot>
      </template>
    </Cell>
  </uni-forms-item>
</template>

<script setup lang="ts">
import Cell from "../cell/index.vue";
import Icon from "../icon/index.vue";
import { createNamespace, addUnit } from "../utils";
import { useChildren } from "../../hooks";
import { FORM_ITEM_KEY } from "./index";
import { isUndefined } from "lodash-es";
import { computed } from "vue";

type Numeric = string | number;
type FormItemProps = {
  label?: string;
  name: string | string[];
  rules?: any[];
  arrow?: boolean;
  required?: boolean;
  disabled?: boolean;
  cellStyle?: any;
  clickable?: boolean;
  labelAlign?: "left" | "top";
  inputAlign?: "top" | "right" | "center" | "left";
  labelWidth?: Numeric;
};

const [_, bem] = createNamespace("form-item");
const props = withDefaults(defineProps<FormItemProps>(), {
  labelAlign: "left",
  // 提示文本的宽度
  labelWidth: 80,
});
const emits = defineEmits(["headerClick"]);

const { linkChildren } = useChildren(FORM_ITEM_KEY);
linkChildren({ props });

const innerInputAlign = computed(() => {
  if (props.inputAlign) return props.inputAlign;
  if (props.labelAlign === "top") return "left";
  return "right";
});

const cellStyle = computed(() => {
  return [
    {
      "--rl-cell-label-margin-top": "var(--rl-form-item-label-top,8px)",
      "--rl-cell-icon-size": "14px",
    },
    props.cellStyle,
  ];
});

const labelStyle = computed(() => {
  const style = {};
  if (props.labelWidth) {
    style["flex"] = `0 0 ${addUnit(props.labelWidth)}`;
  }
  return style;
});

const rules = computed(() => {
  return props.rules?.map((rule) => {
    if (rule.validator === "phone") {
      return {
        pattern: "^1\\d{10}$",
        errorMessage: `请输入正确的手机号格式`,
      };
    }

    if (rule.validator === "idcard") {
      return {
        pattern:
          "^\\d{6}(18|19|20)?\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|X)$",
        errorMessage: `请输入正确的身份证号格式`,
      };
    }

    if (rule.required === true && isUndefined(rule.errorMessage)) {
      return {
        ...rule,
        errorMessage: `请输入${props.label}`,
      };
    }
    return rule;
  });
});

const headerClick = () => {
  emits("headerClick");
};

const isRequired = computed(() => {
  return (
    props.rules?.some((rule) => {
      return rule.required === true;
    }) || props.required
  );
});
</script>

<script lang="ts">
export default {
  name: "FormItem",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>

<style lang="scss">
.uni-forms-item {
  margin-bottom: var(--rl-form-item-margin-bottom, 0) !important;
}

.rl-form-item {
  :deep(.uni-forms-item__content) {
    overflow: hidden !important;
  }

  &--required {
    color: #dd524d;
    font-weight: bold;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__extra {
    margin-left: 8px;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
  }

  &--disabled {
    // background: var(--rl-disabled-text-color);
    color: var(--rl-disabled-text-color);
    --rl-color-weak: var(--rl-disabled-text-color);
  }
}
</style>
