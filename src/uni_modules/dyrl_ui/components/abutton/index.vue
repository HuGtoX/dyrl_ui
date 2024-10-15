<template>
  <button :class="classes" @click="handleClick" :style="customStyle">
    <div v-if="innerLoading" :class="bem('loading')">
      <Icon spin type="LoadingOutlined"></Icon>
      <span v-if="loadingText" :class="bem('loading__text')">加载中...</span>
    </div>

    <template v-else>
      <slot name="icon">
        <span :class="bem('icon')" v-if="icon">
          <Icon :type="icon"></Icon>
        </span>
      </slot>
      <slot></slot>
    </template>
  </button>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>
<script setup lang="ts">
import { ref, computed } from "vue";
import { createNamespace, isPromise } from "../utils";
import Icon from "../icon/index.vue";

const [_, bem] = createNamespace("button");
type ButtonProps = {
  type?:
    | "danger"
    | "primary"
    | "default"
    | "text"
    | "link"
    | "warning"
    | "success";
  size?: "mini" | "small" | "normal" | "large";
  block?: boolean;
  loading?: "auto" | boolean;
  onClick?: () => void;
  shape?: "square" | "round";
  fill?: "none" | "solid";
  disabled?: boolean;
  customStyle?: any;
  plain?: boolean;
  loadingText?: boolean;
  hairline?: boolean;
  link?: string;
  icon?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  block: false,
  size: "normal",
  shape: "round",
  fill: "solid",
  disabled: false,
  loading: "auto",
  loadingText: true,
});

const requestLoading = ref<boolean>(false);
const innerLoading = computed(() => {
  return props.loading === "auto" ? requestLoading.value : props.loading;
});
const disabled = computed(() => {
  return props.disabled || innerLoading.value;
});

const classes = computed(() => [
  bem([
    props.type,
    props.size,
    props.shape,
    {
      hairline: props.hairline,
      plain: props.plain,
      block: props.block,
      disabled: disabled.value,
    },
  ]),
  { ["rl-hairline--surround"]: props.hairline },
]);

const handleClick = async () => {
  if (disabled.value || innerLoading.value) return;

  if (props.link) return uni.navigateTo({ url: props.link });

  if (props.onClick) {
    const promise = props.onClick();
    if (isPromise(promise)) {
      try {
        requestLoading.value = true;
        await promise;
        requestLoading.value = false;
      } catch (e) {
        requestLoading.value = false;
        throw e;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
