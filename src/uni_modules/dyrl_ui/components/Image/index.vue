<template>
  <div :class="bem({ round, block })" :style="style">
    <div :class="bem('loading')" v-if="loading">
      <Icon spin type="LoadingOutlined" />
    </div>
    <div :class="bem('error')" v-if="isError">
      <slot name="error">
        <div>
          <Icon :size="fontSize" v-if="errIcon" type="no-image" />
          <span :style="{ fontSize: `${fontSize}` }" v-else>加载失败</span>
        </div>
      </slot>
    </div>
    <image
      v-else
      @load="loadHandle"
      @error="errorHandle"
      :class="bem('img')"
      :mode="mode"
      :src="ImageSrc"
      :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { addUnit, createNamespace, isDef } from "../utils";
import { computed, ref } from "vue";
import Icon from "../icon/index.vue";

const [_, bem] = createNamespace("image");
type Numeric = string | number;
type ImageProps = {
  round?: boolean;
  block?: boolean;
  src: string;
  mode?: "scaleToFill" | "aspectFit" | "aspectFill" | "widthFix";
  size?: Numeric;
  width?: Numeric;
  height?: Numeric;
  radius?: Numeric;
  errIcon?: boolean;
  alt?: string;
  prefix?: boolean;
  eduPrefix?: boolean;
};

/**
 * prefix 为 true 时 默认添加前缀
 * 图片存储云空间
 */
const ASSETS_URL = import.meta.env.VITE_ASSETS_URL + "/images";
const props = withDefaults(defineProps<ImageProps>(), {
  mode: "scaleToFill",
  width: 300,
  height: 225,
});

const loading = ref(true);
const loadHandle = (load: boolean) => {
  if (load) loading.value = false;
};
const isError = ref(false);

const fontSize = computed(() => {
  let size = 14;
  if (props.size) Number(props.size) > 42 && (size = 18);
  return size;
});

watch(
  () => props.src,
  () => {
    isError.value = false;
  }
);

const errorHandle = () => {
  isError.value = true;
  loading.value = false;
};

const ImageSrc = computed(() => {
  if (props.src && props.src?.[0] !== "/") return props.src;
  if (props.prefix) return `${ASSETS_URL}${props.src}`;
  return props.src;
});

const style = computed(() => {
  let style: any = {
    width: props.size ? addUnit(props.size) : addUnit(props.width),
    height: props.size ? addUnit(props.size) : addUnit(props.height),
  };

  if (isDef(props.radius)) {
    style.overflow = "hidden";
    style.borderRadius = addUnit(props.radius);
  }

  return style;
});
</script>

<script lang="ts">
export default {
  name: "rl-image",
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-image {
  --rl-image-placeholder-text-color: var(--rl-text-color-2);
  --rl-image-placeholder-font-size: var(--rl-font-size-md);
  --rl-image-placeholder-background: var(--rl-background);
  --rl-image-loading-icon-size: 32px;
  --rl-image-loading-icon-color: var(--rl-gray-4);
  --rl-image-error-icon-size: 32px;
  --rl-image-error-icon-color: var(--rl-gray-4);
}

.rl-image {
  flex-shrink: 0;
  position: relative;
  display: block;
  overflow: hidden;

  &--round {
    border-radius: var(--rl-radius-max);

    .rl-image__img {
      border-radius: inherit;
    }
  }

  &__loading {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  &__loading,
  &__error {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--rl-text-color-2);
    font-size: 12px;
    background: #f7f8fa;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &--block {
    display: flex;
  }
}
</style>
