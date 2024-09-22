<template>
  <div :class="name">
    <div
      :class="bem('image__wrapper')"
      :style="[getSizeStyle(imageSize), imageStyle]"
    >
      <image
        :class="bem('image__wrapper-image')"
        :src="imageUrl"
        mode="widthFix"
      ></image>
    </div>
    <span :class="bem('description')" v-if="description">
      {{ description }}
    </span>
    <div :class="bem('wrapper')">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, getSizeStyle } from "../utils";
import { computed } from "vue";
const [name, bem] = createNamespace("empty");
type Numeric = string | number;
type EmptyProps = {
  imageSize?: Numeric;
  imageStyle?: any;
  description?: string;
  image?: string | "data" | "message";
};
const props = withDefaults(defineProps<EmptyProps>(), {
  image: "data",
});
const prefix = "https://school-resource.dyjy2828.com.cn/mini-app/images";

const imageUrl = computed(() => {
  if (["data", "message", "404", "page"].includes(props.image))
    return prefix + `/icons/none/no${props.image}.svg`;
  return props.image;
});
</script>

<script lang="ts">
export default {
  name: "rl-empty",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-empty {
  --rl-empty-padding: var(--rl-padding-xl) 0;
  --rl-empty-image-size: 160px;
  --rl-empty-description-margin-top: var(--rl-padding-md);
  --rl-empty-description-padding: 0 60px;
  --rl-empty-description-color: var(--rl-text-color-2);
  --rl-empty-description-font-size: var(--rl-font-size-md);
  --rl-empty-description-line-height: var(--rl-line-height-md);
  --rl-empty-bottom-margin-top: 24px;
}
.rl-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: var(--rl-empty-padding);
  &__description {
    margin-top: var(--rl-empty-description-margin-top);
    padding: var(--rl-empty-description-padding);
    color: var(--rl-empty-description-color);
    font-size: var(--rl-empty-description-font-size);
    line-height: var(--rl-empty-description-line-height);
  }

  &__image__wrapper {
    width: var(--rl-empty-image-size);
    height: var(--rl-empty-image-size);

    &-image {
      width: 100%;
      height: 100%;
    }
  }

  &__wrapper {
    margin-top: var(--rl-empty-bottom-margin-top);
  }
}
</style>
