<template>
  <ListItem
    :class="[classPrefix, { [`${classPrefix}-active`]: active }]"
    @tap="onClick">
    <slot></slot>
    <template #extra>
      <Icon v-if="active" color="#0173fc" size="16" type="CheckOutline"></Icon>
    </template>
  </ListItem>
</template>

<script setup lang="ts">
import Icon from "../../icon/index.vue";
import ListItem from "../../ListItem/index.vue";
import { inject, computed } from "vue";
import { toString } from "lodash-es";
import type { CheckListValue } from "./CheckList.vue";

const props = defineProps<{ value: CheckListValue }>();
const classPrefix = `check-list-item`;
const context = inject<any>("context");

const active = computed(() => {
  // return context.value.value.includes(props.value);
  return context.value.value.some(
    (item) => toString(item) === toString(props.value)
  );
});

const onClick = () => {
  if (active.value) {
    context.uncheck(props.value);
  } else {
    context.check(props.value);
  }
};
</script>
<script lang="ts">
export default {
  name: "CheckListItem",
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>
<style scoped lang="scss"></style>
