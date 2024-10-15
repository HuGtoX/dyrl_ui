<template>
  <div :class="bem({ block, flex: $slots.extra })">
    <Select
      ref="selectRef"
      v-model:value="value"
      :multiple="multiple"
      :options="data?.list"
      :fieldNames="fieldNames"
      :placeholder="placeholder"
      :width="width"
      @loadMore="onScrolltolower"
      :arrow="arrow && !$slots.extra"
      :clear="clear"
      v-bind="$attrs" />

    <div :class="bem('extra')" @click="open" v-if="$slots.extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from "../Select/index.vue";
import { useInfiniteScroll, useVModel } from "../../hooks";
import { watch, computed } from "vue";
import { createNamespace } from "../utils";

type ProSelectProps = {
  clear?: boolean;
  placeholder?: string;
  multiple?: boolean;
  arrow?: boolean;
  params?: any;
  value?: any;
  width?: number | string;
  block?: boolean;
  inputAlign?: "top" | "right" | "center" | "left";
  request?: (param?: any) => Promise<{ data: any[]; total: number } | any[]>;
  // 自定义节点 label、value、options 的字段
  fieldNames?: {
    label: ((item: any) => string) | string | string[];
    value: string | string[];
  };
};
const [name, bem] = createNamespace("pro-select");
const props = withDefaults(defineProps<ProSelectProps>(), {
  inputAlign: "right",
  arrow: true,
});
const emits = defineEmits(["update:value"]);
const value = useVModel(props, "value", emits);
const PAGE_SIZE = 10;

watch(
  () => props.params,
  () => {
    reload();
  }
);

const { data, loadingMore, loadMore, reload } = useInfiniteScroll(async (d) => {
  const current = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1;
  return props
    .request({ current, pageSize: PAGE_SIZE, ...props.params })
    .then((res) => {
      if (Array.isArray(res)) return { list: res, total: res.length };
      return {
        list: res.data,
        total: res.total,
      };
    });
});

const hasMore = computed(
  () => data.value && data.value?.list.length < data.value.total
);
const onScrolltolower = () => {
  if (!loadingMore) return;
  if (hasMore.value) loadMore();
};

const selectRef = ref();
const open = () => {
  selectRef.value?.open();
};

defineExpose({
  data,
});
</script>

<script lang="ts">
export default {
  name: "ProSelect",
  options: {
    virtualHost: true,
  },
};
</script>

<style scoped lang="scss">
.rl-pro-select {
  &--flex {
    display: flex;
    align-items: center;
  }

  &--block {
    width: 100%;
    flex: 1;
  }

  &__extra {
    margin-left: auto;
    flex-shrink: 0;
  }
}
</style>
