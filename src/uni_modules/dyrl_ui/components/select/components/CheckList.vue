<template>
  <List mode="default">
    <slot></slot>
  </List>
</template>
<script setup lang="ts">
import List from "../../List/index.vue";
import { useVModel } from "../../../hooks";
import { provide } from "vue";
import { toString } from "lodash-es";

export type CheckListValue = string | number;

const props = defineProps<{
  value?: CheckListValue[];
  multiple?: boolean;
  disabled?: boolean;
}>();

const emits = defineEmits(["update:value"]);
const innerValue = useVModel(props, "value", emits);

const check = (val: CheckListValue) => {
  if (props.multiple) {
    innerValue.value.push(val);
  } else {
    innerValue.value = [val];
  }
};

const uncheck = (val: CheckListValue) => {
  innerValue.value = innerValue.value.filter((item) => toString(item) !== toString(val));
};

// watch(innerValue, (data) => {
//   console.log("watch value", data);

//   emits("update:value", data);
// });
provide("context", {
  value: innerValue,
  check,
  uncheck,
});
</script>

<script lang="ts">
export default {
  name: "CheckList",
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>

<style scoped lang="scss"></style>
