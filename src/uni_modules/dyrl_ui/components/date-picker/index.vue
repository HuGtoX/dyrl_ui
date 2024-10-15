<template>
  <uni-datetime-picker
    ref="dateRef"
    :type="type"
    :disabled="readOnly"
    :clear-icon="false"
    :start="start"
    :hide-second="hideSecond"
    @maskClick="maskClick"
    @change="change"
    v-model="innerValue"
  >
    <div @click.stop="handleClick" :class="name">
      <Input
        style="flex: 1"
        :readOnly="true"
        :value="inputValue"
        :placeholder="inputPlaceholder"
      ></Input>
      <!-- 清除上次选中的状态和值	 -->
      <div
        v-if="!isEmpty(innerValue) && clearIcon && !readOnly"
        @click.stop="clear"
        :class="bem('icon')"
      >
        <Icon type="close" />
      </div>
      <div v-if="arrow || $slots.extra" :class="bem('extra')">
        <slot name="extra">
          <Icon
            v-if="isEmpty(innerValue)"
            :style="iconStyle"
            type="RightOutline"
          />
        </slot>
      </div>
    </div>
  </uni-datetime-picker>
</template>
<script setup lang="ts">
import Input from "../Input/index.vue";
import Icon from "../Icon/index.vue";
import { createNamespace } from "../utils";
import { useVModel } from "../../hooks";
import { isEmpty } from "lodash-es";
import { computed, ref } from "vue";

const [name, bem] = createNamespace("date-picker");
type DatePickerProps = {
  readOnly?: boolean;
  disable?: boolean;
  hideSecond?: boolean;
  clearIcon?: boolean;
  start?: string | number;
  value: any;
  arrow?: boolean;
  type?: "date" | "daterange" | "datetime" | "datetimerange";
  placeholder?: string;
};
const props = withDefaults(defineProps<DatePickerProps>(), {
  type: "datetime",
  placeholder: "请选择",
  clearIcon: true,
});

const emit = defineEmits(["update:value"]);
const innerValue = useVModel(props, "value", emit);

const dateRef = ref();
const clear = () => {
  dateRef.value.clear();
};

const drawerShow = ref(false);
const change = () => {
  drawerShow.value = false;
};
const maskClick = () => {
  drawerShow.value = false;
};
const handleClick = () => {
  dateRef.value.show();
  drawerShow.value = true;
};
const iconStyle = computed(() => {
  const rotateAngle = drawerShow.value ? "-90deg" : "90deg";
  return {
    transform: `rotate(${rotateAngle})`,
    transition: "transform 0.3s",
  };
});

const inputPlaceholder = computed(() => {
  if (props.type === "daterange" || props.type === "datetimerange") {
    return "开始日期  -  结束日期";
  }
  return props.placeholder;
});
const inputValue = computed(() => {
  if (Array.isArray(innerValue.value)) {
    if (isEmpty(innerValue.value)) return "";
    return `${innerValue.value[0]} - ${innerValue.value[1]}`;
  }
  return innerValue.value;
});
</script>

<script lang="ts">
export default {
  name: "DatePicker",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-date-picker {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  color: var(--rl-placeholder-color);

  &__extra {
    margin-left: auto;
    flex-shrink: 0;
  }

  &__icon {
    display: flex;
    padding: 0 5px;
    align-items: center;
  }
}
</style>
