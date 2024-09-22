<template>
  <div :class="bem([type])">
    <div :class="bem('wrapper')">
      <slot name="nav-left" />

      <scroll-view
        :scroll-x="scrollable"
        :scroll-with-animation="scrollWithAnimation"
        :scroll-left="scrollLeft"
        :class="bem('wrapper__scroll-view')"
        :style="scrollStyle"
      >
        <div
          :class="bem('nav', [type])"
          :style="[navStyle, { flex: scrollable ? '' : 1 }]"
        >
          <div v-if="type === 'line'" :class="bem('line')" :style="lineStyle" />
          <div v-if="type === 'card'" :class="bem('card')" :style="cardStyle" />
          <div
            :style="[
              { flex: scrollable ? '' : 1 },
              itemStyle,
              innerCurrent === index ? activeStyle : inactiveStyle,
            ]"
            :class="[
              bem('nav__item', { shrink, active: innerCurrent === index }),
              bem(`nav__item-${index}`),
            ]"
            @click="clickHandler(item, index)"
            v-for="(item, index) in list"
            :key="index"
          >
            <div :class="{ 'text-line-1': ellipsis }" :style="titleStyle">
              {{ item.name }}
            </div>
          </div>
        </div>
      </scroll-view>

      <slot name="nav-right" />
    </div>

    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import { isNumber } from "lodash-es";
import { createNamespace, addUnit } from "../utils";
import {
  ref,
  computed,
  nextTick,
  onMounted,
  getCurrentInstance,
  watchEffect,
} from "vue";
import { useTabs } from "./index";

type TabsProps = {
  type?: "line" | "card";
  scrollable?: boolean;
  scrollWithAnimation?: boolean;
  lineColor?: string;
  ellipsis?: boolean;
  color?: string;
  titleStyle?: any;
  itemStyle?: any;
  title?: string;
  lineWidth?: number;
  duration?: number;
  list?: any[];
  current?: number;
  activeStyle?: any;
  inactiveStyle?: any;
  value?: number;
  shrink?: boolean;
};
const props = withDefaults(defineProps<TabsProps>(), {
  scrollable: true,
  scrollWithAnimation: true,
  type: "line",
  lineWidth: 20,
  duration: 200,
});

const [name, bem] = createNamespace("tabs");
const emit = defineEmits(["change", "click", "update:value"]);
const innerList = ref<any>([]);
const instance = getCurrentInstance();
const lineWidth = computed(() => {
  return props.lineWidth;
});

const {
  resize,
  lineOffsetLeft,
  innerCurrent,
  init,
  firstTime,
  scrollLeft,
  tabsItemWidth,
  cardOffsetLeft,
} = useTabs(innerList, lineWidth, instance);

const cardStyle = computed(() => {
  return {
    width: addUnit(tabsItemWidth.value),
    background: props.lineColor,
    transform: `translate(${cardOffsetLeft.value}px)`,
    transitionDuration: `${firstTime.value ? 0 : props.duration}ms`,
  };
});
const lineStyle = computed(() => {
  return {
    width: addUnit(props.lineWidth),
    background: props.lineColor,
    transform: `translate(${lineOffsetLeft.value}px)`,
    transitionDuration: `${firstTime.value ? 0 : props.duration}ms`,
  };
});
const navStyle = computed(() => {
  return { color: props.color };
});
const scrollStyle = computed(() => {
  return { "border-color": props.color };
});

watch(innerCurrent, (value) => {
  emit("update:value", value);
});

watchEffect(() => {
  innerList.value = props.list;
  if (isNumber(props.current) && props.current !== innerCurrent.value) {
    innerCurrent.value = props.current;
    nextTick(() => {
      resize();
    });
  }
});

onMounted(() => {
  init();
});
// 点击某一个标签
const clickHandler = (item: any, index: any) => {
  // 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
  emit("click", {
    ...item,
    index,
  });
  // 如果disabled状态，返回
  if (item.disabled) return;
  if (innerCurrent.value != index) {
    emit("change", {
      ...item,
      index,
    });
  }
  innerCurrent.value = index;
  nextTick(() => {
    resize();
  });
};

defineExpose({
  resize: init,
});
</script>

<script lang="ts">
export default {
  name: "rl-tabs",
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
