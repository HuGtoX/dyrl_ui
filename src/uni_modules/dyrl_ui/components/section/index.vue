<template>
  <div :class="bem({ flex })">
    <div v-if="title" :class="bem('header')">
      <div :class="bem('header__decoration', [type])" v-if="type" />
      <slot v-else name="decoration"></slot>

      <div :class="bem('header__content')">
        <text
          :style="
            omitByUndefined({
              'font-size': addUnit(titleFontSize),
              color: titleColor,
            })
          "
          class="rl-section__content-title"
          :class="{ distraction: !subTitle }"
          >{{ title }}</text
        >
        <text
          v-if="subTitle"
          :style="
            omitByUndefined({
              'font-size': subTitleFontSize,
              color: subTitleColor,
            })
          "
          :class="bem('header__content-sub')"
          >{{ subTitle }}</text
        >
      </div>

      <div :class="bem('header__slot-right')">
        <slot name="right">
          <Button
            style="padding: 0"
            size="small"
            type="link"
            v-if="moreText"
            :onClick="moreClick">
            <span :class="bem('header__more-text')">
              {{ moreText }}
              <Icon :size="12" type="RightOutline" />
            </span>
          </Button>
        </slot>
      </div>
    </div>

    <div
      :class="bem('content')"
      :style="omitByUndefined({ padding: paddingSpace, background })">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addUnit, omitByUndefined, createNamespace } from "../utils";
import Icon from "../icon/index.vue";
import Button from "../button/index.vue";
import { computed } from "vue";

const [name, bem] = createNamespace("section");

type Numeric = string | number;
type SectionProps = {
  // 标题装饰类型
  type?: "line" | "circle" | "square";
  // 主标题
  title?: string;
  // 主标题字体大小
  titleFontSize?: Numeric;
  // 主标题字体颜色
  titleColor?: string;
  // 副标题
  subTitle?: string;
  // 副标题字体颜色
  subTitleColor?: string;
  // 副标题字体大小
  subTitleFontSize?: string;
  // 右侧文本
  moreText?: string;
  // 右侧文本点击事件
  moreClick?: (payload?: any) => void;
  // 默认插槽 padding
  padding?: Numeric | Numeric[];
  // 默认插槽 background
  background?: string;
  flex?: boolean;
};
const props = defineProps<SectionProps>();

const paddingSpace = computed(() => {
  if (Array.isArray(props.padding)) {
    return props.padding.map((item) => addUnit(item)).join(" ");
  }
  return addUnit(props.padding);
});
</script>
<script lang="ts">
export default {
  name: "rl-section",
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
  },
};
</script>
<style lang="scss">
.rl-section {
  --rl-section-background: var(--rl-white);
  --rl-section-header-padding: 12px 10px;
  --rl-section-header-font-weight: 500;
}

.rl-section {
  background: transparent;

  &--flex {
    flex: 1;
    overflow: hidden;
    .rl-section__content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .rl-section__header {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--rl-section-header-padding);
    font-weight: var(--rl-section-header-font-weight);

    &__more-text {
      display: inline-flex;
      align-items: baseline;
      gap: 2px;
    }

    &__decoration {
      margin-right: 8px;
      background-color: var(--rl-primary-color);
      &--line {
        width: 4px;
        height: 14px;
        border-radius: 6px;
      }

      &--circle {
        width: 8px;
        height: 8px;
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
      }

      &--square {
        width: 8px;
        height: 8px;
      }
    }

    &__content {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      flex: 1;
      color: #333;

      .distraction {
        flex-direction: row;
        align-items: center;
      }
      &-sub {
        margin-top: 2px;
      }
    }

    &__slot-right {
      font-size: 14px;
    }
  }

  .rl-section__content {
    font-size: 14px;
  }
}
</style>
