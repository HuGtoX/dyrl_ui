<template>
  <div :class="bem({ disabled })">
    <div :style="selectStyle" :class="bem('content')" @click="handleClick">
      <Input
        :disabled="disabled"
        :readOnly="true"
        :value="inputValue"
        :placeholder="placeholder"></Input>

      <div v-if="arrow || $slots.extra || clear" :class="bem('content__extra')">
        <Icon @tap.stop="clearHandle" v-if="isClear" type="close"></Icon>
        <slot name="extra">
          <Icon
            v-if="isArrow && !readOnly"
            :style="iconStyle"
            type="RightOutline"></Icon>
        </slot>
      </div>
    </div>

    <Drawer
      :maskClick="maskClick"
      style="text-align: left"
      ref="drawerRef"
      :title="placeholder">
      <Search
        v-if="search"
        style="margin: 0 12px 10px 12px"
        @search="searchClick"
        @clear="searchClick"
        @clickIcon="searchClick"></Search>

      <scroll-view
        scroll-y
        @scrolltolower="loadMore"
        :class="bem('scroll-view')">
        <CheckList :multiple="multiple" v-model:value="checkListValue">
          <CheckListItem
            v-for="item in options"
            :key="item.value"
            :value="item.value">
            {{ item.label }}
          </CheckListItem>
        </CheckList>
      </scroll-view>

      <div :class="bem('empty')" v-if="isEmpty(options)">
        <Empty description="暂无数据"></Empty>
      </div>

      <div v-else class="px-10px py-10px">
        <Button block type="primary" :onClick="handleConfirm"> 确定 </Button>
      </div>
    </Drawer>
  </div>
</template>
<script setup lang="ts">
import Input from "../input/index.vue";
import Drawer from "../drawer/index.vue";
import Button from "../button/index.vue";
import CheckList from "./components/CheckList.vue";
import CheckListItem from "./components/CheckListItem.vue";
import Search from "../search/index.vue";
import Empty from "../empty/index.vue";
import Icon from "../icon/index.vue";
import { createNamespace, omitByUndefined, addUnit } from "../utils";
import { computed, ref, watch } from "vue";
import {
  find,
  get,
  castArray,
  isEmpty,
  isEqual,
  isArray,
  transform,
} from "lodash-es";

type Numeric = string | number;
type SelectProps = {
  arrow?: boolean;
  clear?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: any;
  // 是否允许多选
  multiple?: boolean;
  // 选择框默认文本
  placeholder?: string;
  search?: boolean;
  bgColor?: string;
  radius?: Numeric;
  width?: Numeric;
  options: { label: string; value: Numeric }[];
  // 自定义节点 label、value、options 的字段
  fieldNames?: {
    label: ((item: any) => string) | (string | string[]);
    value: string | string[];
  };
};
const [_, bem] = createNamespace("select");
const drawerRef = ref();
const checkListValue = ref<any>([]);
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  options: () => [],
  fieldNames: () => ({
    label: "label",
    value: "value",
  }),
  placeholder: "请选择",
});
const emits = defineEmits(["update:value", "loadMore", "search"]);

const selectStyle = computed(() => {
  const style = omitByUndefined({
    width: addUnit(props.width),
    borderRadius: addUnit(props.radius),
    background: props.bgColor,
  });

  return style;
});

const searchClick = (keyword) => {
  emits("search", keyword);
};

const isClear = computed(() => {
  let isRight = props.value;
  if (typeof props.value === "number") isRight = true;
  if (typeof props.value === "object" && !isEmpty(props.value)) isRight = true;

  return props.clear && isRight;
});

const isArrow = computed(() => {
  return !isClear.value && props.arrow;
});

const clearHandle = () => {
  if (props.multiple) emits("update:value", []);
  else emits("update:value", undefined);
};

const drawerShow = ref(false);
const handleClick = () => {
  if (props.disabled || props.readOnly) return;
  drawerRef.value.open();
  drawerShow.value = true;
};
const maskClick = () => {
  drawerShow.value = false;
};
const iconStyle = computed(() => {
  const rotateAngle = drawerShow.value ? "-90deg" : "90deg";
  return {
    transform: `rotate(${rotateAngle})`,
    transition: "transform 0.3s",
  };
});

const handleConfirm = () => {
  drawerRef.value.close();
  drawerShow.value = false;
  if (isEmpty(checkListValue.value)) return emits("update:value", undefined);
  // 多选返回数组
  if (props.multiple) emits("update:value", checkListValue.value);
  else emits("update:value", checkListValue.value[0]);
};

// 数据回填初始化
watch(
  () => props.value,
  (newVal, oldVal) => {
    if (props.multiple) {
      if (isArray(newVal)) {
        !isEqual(checkListValue.value, newVal) &&
          (checkListValue.value = newVal);
        console.log("multiple newVal", newVal);
      }
    } else {
      console.log("newVal", newVal);
      newVal !== checkListValue.value?.[0] &&
        (checkListValue.value[0] = newVal);
    }
  },
  { immediate: true }
);

const inputValue = computed(() => {
  const value = castArray(props.value);
  if (
    isEmpty(value) ||
    isEmpty(props.options) ||
    typeof value[0] === "undefined"
  )
    return;
  return value
    .map((item) => {
      const selectedItem = find(
        props.options,
        (option) => get(option, props.fieldNames.value) == item
      );
      return renderLabel(selectedItem);
    })
    .join("、");
});

const options = computed(() => {
  const { label, value } = props.fieldNames;
  if (label === "label" && value === "value") return props.options;
  return props.options?.map((item) => {
    return {
      value: get(item, value),
      label: renderLabel(item),
    };
  });
});

const loadMore = () => {
  emits("loadMore");
};

const renderLabel = (selectedItem) => {
  const { label } = props.fieldNames;
  if (typeof label === "function") {
    return label(selectedItem);
  }
  return get(selectedItem, label);
};

defineExpose({
  open: handleClick,
});
</script>

<script lang="ts">
export default {
  name: "rl-select",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>

<style scoped lang="scss">
.rl-select {
  --rl-color-background: transparent;

  &__content {
    display: inline-flex;
    align-items: center;
    // color: var(--rl-placeholder-color);

    &--block {
      display: flex;
    }

    &__extra {
      color: var(--rl-placeholder-color);
      display: flex;
      margin-left: auto;
      flex-shrink: 0;
    }
  }

  &--disabled {
    cursor: not-allowed;
  }

  &__scroll-view {
    flex: auto;
    min-height: 0;
    max-height: 50vh;
    overflow-y: auto;
  }
}
</style>
