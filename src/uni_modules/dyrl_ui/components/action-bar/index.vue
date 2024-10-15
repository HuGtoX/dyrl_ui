<template>
  <div ref="instance" :class="name">
    <div :class="bem('content', { fixed })">
      <div :class="bem('content__item')">
        <slot />
      </div>
      <SafeArea position="bottom" v-if="safeAreaInsetBottom"></SafeArea>
    </div>

    <!-- fixed 占位元素 -->
    <div
      v-if="placeholder"
      :style="{
        height: placeholderHeight + 'px',
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import SafeArea from "../SafeArea/index.vue";
import { onMounted, ref } from "vue";
import { createNamespace } from "../utils";
/**
 * @property {Boolean}			safeAreaInsetBottom	是否为iPhoneX留出底部安全距离（默认 true ）
 * @property {Boolean}			border				是否显示上方边框（默认 true ）
 * @property {String | Number}	zIndex				元素层级z-index（默认 1 ）
 * @property {Boolean}			fixed				是否固定在底部（默认 true ）
 * @property {Boolean}			placeholder			fixed定位固定在底部时，是否生成一个等高元素防止塌陷（默认 true ）
 */

const [name, bem] = createNamespace("action-bar");

type ActionBarProps = {
  border?: boolean;
  placeholder?: boolean;
  safeAreaInsetBottom?: boolean;
  fixed?: boolean;
};

const props = withDefaults(defineProps<ActionBarProps>(), {
  border: true,
  placeholder: true,
  fixed: true,
  safeAreaInsetBottom: true,
});
onMounted(async () => {
  // 该函数待修复，暂时为固定高度
  await setPlaceholderHeight();
});

const placeholderHeight = ref(0);
const setPlaceholderHeight = async () => {
  if (!props.fixed || !props.placeholder) return;
  placeholderHeight.value = 60;
};
</script>
<script lang="ts">
export default {
  name: "rl-action-bar",
  options: {
    virtualHost: true,
  },
};
</script>
<style lang="scss" scoped>
.rl-action-bar {
  &__content {
    background-color: var(--rl-action-bar-background, #fff);

    &__item {
      min-height: 50px;
      padding: 5px 15px;
    }

    &--fixed {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
  }
}
</style>
