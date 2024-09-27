<template>
  <div :class="bem({ shadow })" :style="[cardStyle, customStyle]">
    <div v-if="title || $slots.title" :class="bem('header')">
      <!-- 卡片标题 -->
      <slot name="thumbnail">
        <div v-if="thumbnail || icon" :class="bem('header__avatar')">
          <Avatar
            shape="square"
            :radius="thumbnailRadius"
            :background="iconBackground"
            :icon="icon"
            :iconSize="iconSize"
            :src="thumbnail"
            :size="thumbnailSize" />
        </div>
      </slot>

      <div :class="bem('header__content')">
        <slot name="title">
          <span
            :class="[
              bem('header__content__title'),
              { [`text-line-${line}`]: line },
            ]">
            {{ title }}
          </span>
        </slot>
        <slot name="subText">
          <span
            v-if="subText"
            :class="[
              bem('header__content__sub-text'),
              { [`text-line-${line}`]: line },
            ]"
            >{{ subText }}</span
          >
        </slot>
      </div>

      <div :class="bem('header__extra')">
        <slot name="extra">
          <span v-if="extraText" :class="bem('header__extra-text')">
            {{ extraText }}
          </span>
        </slot>
      </div>
    </div>

    <slot></slot>

    <slot name="footer">
      <div
        v-if="footerText"
        :class="[bem('footer'), { 'rl-hairline--top': footerBorder }]">
        <div class="text-line-1">{{ footerText }}</div>
        <div :class="bem('footer__extra')">
          <slot name="footerExtra">
            <Button
              v-if="linkUrl"
              :onClick="() => navigateTo(linkUrl)"
              size="small"
              type="link"
              :customStyle="{ '--rl-button-small-height': '20px' }">
              <span>
                查看详情
                <Icon type="RightOutline"></Icon>
              </span>
            </Button>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { addUnit, createNamespace } from "../utils";
import { computed, type CSSProperties } from "vue";
import Avatar from "../Avatar/index.vue";
import Button from "../Button/index.vue";
import Icon from "../Icon/index.vue";

type Numeric = string | number;
type CardProps = {
  title?: string;
  color?: string;
  bgColor?: string;
  spacing?: Numeric | Numeric[];
  extraText?: string;
  subText?: string;
  thumbnail?: string;
  thumbnailSize?: number | "large" | "middle" | "small";
  thumbnailRadius?: Numeric;
  icon?: string;
  iconSize?: Numeric;
  iconBackground?: string;
  footerText?: string;
  footerExtraText?: string;
  footerBorder?: boolean;
  linkUrl?: string;
  customStyle?: any;
  href?: string;
  line?: number;
  shadow?: boolean;
};
const [name, bem] = createNamespace("card");
const props = withDefaults(defineProps<CardProps>(), {
  footerExtraText: "查看详情",
  thumbnailSize: "small",
  thumbnailRadius: 4,
});

const cardStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.bgColor) {
    style["background"] = props.bgColor;
  }
  if (Array.isArray(props.spacing)) {
    style["padding"] = props.spacing.map((item) => addUnit(item)).join(" ");
  } else if (props.spacing) {
    style["padding"] = addUnit(props.spacing);
  }
  return style;
});
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
    multipleSlots: true,
  },
};

const navigateTo = (url: string) => {
  uni.navigateTo({ url });
};
</script>

<style lang="scss" scoped>
.rl-card {
  --rl-card-color: var(--rl-main-text-color);
  --rl-card-size: var(--rl-font-size-md);
  --rl-background-color: var(--rl-white);
  --rl-card-margin-bottom: var(--rl-padding-sm);
  --rl-card-border-color: rgba(0, 0, 0, 0.1);
  --rl-card-border-radius: 10px;
  --rl-card-avatar-margin: 10px;
  --rl-card-padding: 10px 12px;
}
.rl-card {
  position: relative;
  border-radius: var(--rl-card-border-radius);
  padding: var(--rl-card-padding);
  color: var(--rl-card-color);
  font-size: var(--rl-card-size);
  background: var(--rl-background-color);
  margin-bottom: var(--rl-card-margin-bottom);
  box-sizing: border-box;
  overflow: hidden;

  &--shadow {
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    align-items: center;

    &__extra {
      flex-shrink: 0;
      margin-left: auto;
    }

    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      &__sub-text {
        margin-top: 3px;
        font-size: var(--rl-card-sub-font-size, 14px);
        color: var(--rl-card-sub-color, #8d969f);
      }

      &__title {
        font-size: var(--rl-card-title-font-size, 16px);
        color: var(--rl-card-title-color, #2f343a);
      }
    }

    &__avatar {
      margin-right: 10px;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--rl-card-footer-padding-top, 10px);
    color: #8d969f;
    font-size: var(--rl-card-bottom-font-size, 12px);
    --rl-border-width: 2px;

    &__extra {
      flex-shrink: 0;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
}
</style>
