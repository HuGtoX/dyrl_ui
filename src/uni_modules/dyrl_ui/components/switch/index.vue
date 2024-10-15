<template>
  <div :class="bem({ disabled })" :style="[switchStyle]" @click="clickHandler">
    <div :class="bem('bg')" :style="[bgStyle]"></div>
    <div
      :class="bem('node', { on: innerValue })"
      :style="[nodeStyle]"
      ref="rl-switch__node">
      <Loading
        v-if="loading"
        :color="innerValue ? activeColor : '#AAABAD'"
        :size="size * 0.6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { computed, ref, nextTick } from "vue";
import { useVModel } from "../../hooks/useVModel";
import Loading from "../loading/index.vue";

const [name, bem] = createNamespace("switch");
type SwitchProps = {
  disabled?: boolean;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  activeValue?: any;
  inactiveValue?: any;
  customInactiveColor?: boolean;
  space?: number;
  modelValue?: string | number | boolean;
};
const props = withDefaults(defineProps<SwitchProps>(), {
  size: 22,
  space: 0,
  activeColor: "#07C160",
  inactiveColor: "#fff",
  activeValue: true,
  inactiveValue: false,
});

const emit = defineEmits(["change", "update:modelValue", "input"]);

const innerValue = useVModel(props, "modelValue", emit);
const isActive = computed(() => {
  return innerValue.value === props.activeValue;
});
const loading = ref(false);
const switchStyle = computed(() => {
  let style: any = {};
  // 这里需要加2，是为了腾出边框的距离，否则圆点node会和外边框紧贴在一起
  style.width = addUnit(props.size * 2 + 2);
  style.height = addUnit(props.size + 2);
  // 如果自定义了“非激活”演示，name边框颜色设置为透明(跟非激活颜色一致)
  // 这里不能简单的设置为非激活的颜色，否则打开状态时，会有边框，所以需要透明
  if (props.customInactiveColor) {
    style.borderColor = "rgba(0, 0, 0, 0)";
  }
  style.backgroundColor = isActive.value
    ? props.activeColor
    : props.inactiveColor;
  return style;
});

const nodeStyle = computed(() => {
  let style: any = {};
  // 如果自定义非激活颜色，将node圆点的尺寸减少两个像素，让其与外边框距离更大一点
  style.width = addUnit(props.size - props.space);
  style.height = addUnit(props.size - props.space);
  const translateX = isActive.value
    ? addUnit(props.space)
    : addUnit(props.size);
  style.transform = `translateX(-${translateX})`;
  return style;
});

const bgStyle = computed(() => {
  let style: any = {};
  // 这里配置一个多余的元素在HTML中，是为了让switch切换时，有更良好的背景色扩充体验(见实际效果)
  style.width = addUnit(props.size * 2 - props.size / 2);
  style.height = addUnit(props.size);
  style.backgroundColor = props.inactiveColor;
  // 打开时，让此元素收缩，否则反之
  style.transform = `scale(${isActive.value ? 0 : 1})`;
  return style;
});

const clickHandler = () => {
  if (!props.disabled && !loading.value) {
    const oldValue = isActive.value ? props.inactiveValue : props.activeValue;

    emit("input", oldValue);
    innerValue.value = oldValue;

    // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
    nextTick(() => {
      emit("change", oldValue);
    });
  }
};
</script>

<script lang="ts">
export default {
  name: "rl-switch",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-switch {
  display: inline-flex;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: relative;
  background-color: #fff;
  border-width: 1px;
  border-radius: 100px;
  transition: background-color 0.4s;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.15);
  border-style: solid;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  &__node {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: #fff;
    border-radius: 100px;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.35);
    transition-property: transform;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }
  &__bg {
    position: absolute;
    border-radius: 100px;
    background-color: #ffffff;
    transition-property: transform;
    transition-duration: 0.4s;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transition-timing-function: ease;
  }
  &--disabled {
    opacity: 0.6;
  }
}
</style>
