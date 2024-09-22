<template>
  <div :class="bem([shape, { [size]: sizeType, block }])" :style="avatarStyle">
    <div :class="bem('icon')" v-if="icon || $slots.default">
      <slot name="default">
        <Icon v-if="icon" :size="iconSize" :color="iconColor" :type="icon" />
      </slot>
    </div>

    <template v-else>
      <div :class="bem('error')" v-if="isError">
        <slot name="error">
          <slot name="error"> 加载失败 </slot>
        </slot>
      </div>

      <image
        v-else-if="isImage"
        @error="errorHandle"
        :class="bem('img')"
        :src="src"
        :alt="alt"
      />

      <div v-else :class="bem('text')">
        <span v-if="text">{{ text?.[0] }}</span>
        <Icon v-else type="user" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { createNamespace, isDef, addUnit, omitByUndefined } from "../utils";
import { computed, ref } from "vue";
import Icon from "../Icon/index.vue";
const [_, bem] = createNamespace("avatar");
type Numeric = string | number;
type AvatarProps = {
  shape?: "round" | "square";
  block?: boolean;
  src?: string;
  size?: string | number | "large" | "middle" | "small";
  width?: Numeric;
  height?: Numeric;
  text?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: Numeric;
  alt?: string;
  background?: string;
  radius?: Numeric;
};
const props = withDefaults(defineProps<AvatarProps>(), {
  size: "middle",
  shape: "round",
});
const isError = ref(false);
const errorHandle = () => {
  isError.value = true;
};
const isImage = computed(() => {
  return props.src;
});
const sizeType = computed(() => {
  return (
    typeof props.size === "string" &&
    ["large", "middle", "small"].includes(props.size)
  );
});
const avatarStyle = computed(() => {
  let style = !sizeType.value
    ? {
        width: addUnit(props.size),
        height: addUnit(props.size),
        fontSize: props.icon
          ? addUnit(+props.size / 2)
          : addUnit(+props.size / 2.5),
      }
    : omitByUndefined({
        width: addUnit(props.width),
        height: addUnit(props.height),
      });

  if (isDef(props.background)) {
    style.background = props.background;
  }
  if (isDef(props.radius)) {
    style.overflow = "hidden";
    style.borderRadius = addUnit(props.radius);
  }

  return style;
});
</script>

<script lang="ts">
export default {
  name: "rl-avatar",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-avatar {
  --rl-avatar-background: var(--rl-blue);
  --rl-avatar-text-color: var(--rl-white);
  --rl-avatar-large-size: 68px;
  --rl-avatar-large-text-size: 30px;
  --rl-avatar-middle-size: 42px;
  --rl-avatar-middle-text-size: 16px;
  --rl-avatar-small-size: 24px;
  --rl-avatar-small-text-size: 14px;
}

.rl-avatar {
  position: relative;
  display: inline-flex;
  color: var(--rl-avatar-text-color);
  box-sizing: border-box;

  &--middle {
    width: var(--rl-avatar-middle-size);
    height: var(--rl-avatar-middle-size);
    font-size: var(--rl-avatar-middle-text-size);
  }

  &--large {
    width: var(--rl-avatar-large-size);
    height: var(--rl-avatar-large-size);
    font-size: var(--rl-avatar-large-text-size);
  }

  &--small {
    width: var(--rl-avatar-small-size);
    height: var(--rl-avatar-small-size);
    font-size: var(--rl-avatar-small-text-size);
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &--square {
    overflow: hidden;
    border-radius: var(--rl-radius-lg);
  }

  &--round {
    overflow: hidden;
    border-radius: var(--rl-radius-max);

    .rl-avatar__img {
      border-radius: inherit;
    }
  }

  &__icon,
  &__text,
  &__error {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__text {
    text-align: center;
    background: var(--rl-avatar-background);
  }

  &__error {
    background: var(--rl-gray-5);
  }

  &--block {
    display: flex;
  }
}
</style>
