<template>
  <div :class="name">
    <!-- fixed 占位元素 -->
    <div
      :class="bem('placeholder')"
      v-if="fixed && !isDef(renderStatusBarHeight)"
      :style="{ height: addUnit(navRect.height) }"
    ></div>

    <div
      :class="bem('wrapper', { fixed })"
      :style="omitByUndefined({ background: bgColor })"
    >
      <!-- 系统状态栏 -->
      <div :style="{ height: addUnit(navRect.statusBarHeight) }"></div>

      <div :class="bem('content')" :style="{ height: addUnit(navRect.navBarHeight) }">
        <!-- 导航栏左侧 -->
        <div @click="leftClick" :class="bem('content__left')">
          <slot name="left">
            <Button
              v-if="arrow || leftText"
              :disabled="leftDisabled"
              :customStyle="leftStyle"
              type="link"
              size="mini"
            >
              <span :class="bem('content__left__text')">
                <Icon v-if="arrow" type="LeftOutline" />
                <text v-if="leftText">{{ leftText }}</text>
              </span>
            </Button>
          </slot>
        </div>

        <div :class="bem('content__title')" :style="centerStyle">
          <slot name="center">
            <text :class="['text-line-1']">{{ title }}</text>
          </slot>
        </div>

        <!-- 导航栏右侧 -->
        <div @click="rightClick" :class="bem('content__right')" :style="maxWidth">
          <slot name="right">
            <Icon v-if="rightIcon" :type="rightIcon" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "rl-nav-bar",
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
};
</script>
<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { reactive, computed, inject } from "vue";
import { isEmpty } from "lodash-es";
import {
  createNamespace,
  omitByUndefined,
  addUnit,
  isDef,
  getRect,
  sleep,
} from "../utils";
import Button from "../Button/index.vue";
import Icon from "../Icon/index.vue";

const renderStatusBarHeight = inject<any>("rl-statusBarHeight", null);
const [name, bem] = createNamespace("nav-bar");
const props = withDefaults(
  defineProps<{
    leftStyle?: any;
    leftText?: string;
    autoBack?: boolean;
    switchTab?: string;
    title?: string;
    fixed?: boolean;
    bgImg?: string;
    bgColor?: string;
    arrow?: boolean;
    rightIcon?: string;
    leftDisabled?: boolean;
    onLeftClick?: () => boolean | Promise<boolean>;
  }>(),
  {
    arrow: true,
    leftStyle: {
      "--rl-button-link-color": "var(--rl-nav-bar-color)",
    },
  }
);
const emit = defineEmits(["rightClick"]);

const navRect = reactive({
  height: 0,
  statusBarHeight: 0,
  navBarHeight: 0,
  navPaddingRight: 0,
  leftWidth: 0,
});

let instance;
onMounted(async () => {
  instance = getCurrentInstance();
  // 这里不设置延迟的话在小程序中无法正确获取导航左侧尺寸
  await sleep(20);
  const size: any = await getNavBarLeftRect();
  navRect.leftWidth = size.left + size.width;
});
// 获取导航左侧尺寸
const getNavBarLeftRect = () => {
  return new Promise((resolve) => {
    queryRect("rl-nav-bar__content__left").then((size) => resolve(size));
  });
};
// 获取各个标签的尺寸
function queryRect(el: any) {
  // 组件内部一般用this.$uvGetRect，对外的为getRect，二者功能一致，名称不同
  return new Promise((resolve) => {
    getRect(`.${el}`, instance).then((size) => {
      resolve(size);
    });
  });
}

const centerStyle = computed(() => {
  const style = {
    maxWidth: `calc(100% - ${navRect.navPaddingRight + navRect.leftWidth}px)`,
  };
  if (!props.title) {
    style["marginRight"] = navRect.navPaddingRight + "px";
    style["marginLeft"] = navRect.leftWidth + "px";
  }
  return style;
});

const maxWidth = computed(() => {
  return {
    paddingRight: navRect.navPaddingRight + "px",
    maxWidth: `calc(100% - ${navRect.navPaddingRight}px)`,
  };
});

onShow(() => {
  uni.getSystemInfo({
    //获取系统信息
    success: (res: any) => {
      let navBarHeight = 46;
      let statusBarHeight = res.statusBarHeight;
      // #ifdef  H5
      statusBarHeight = 0;
      // #endif

      // #ifdef  MP-WEIXIN
      let menuButtonObject = uni.getMenuButtonBoundingClientRect(); //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
      navBarHeight =
        menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航栏高度=菜单按钮高度+（菜单按钮与顶部距离-状态栏高度）*2
      navRect.navPaddingRight = menuButtonObject.width;
      // #endif
      // 自定义导航栏高度
      navRect.statusBarHeight = statusBarHeight;
      navRect.height = navBarHeight + statusBarHeight;
      navRect.navBarHeight = navBarHeight;

      if (props.fixed && isDef(renderStatusBarHeight?.value))
        renderStatusBarHeight.value = navBarHeight + statusBarHeight;
    },
  });
});

const rightClick = () => {
  emit("rightClick");
};

// 点击左侧区域
const leftClick = async () => {
  if (props.leftDisabled || !props.arrow) return;

  let isContinue = true;
  if (props.onLeftClick) {
    isContinue = await props.onLeftClick();
  }

  if (isContinue) {
    if (getCurrentPages().length === 1 || isEmpty(getCurrentPages()))
      // 自动返回上一页或者首页
      uni.switchTab({
        url: import.meta.env.VITE_HOME_PATH ?? "/pages/home/index",
      });
    else uni.navigateBack();
  }
};
</script>

<style>
.rl-nav-bar {
  --rl-nav-bar-height: 46px;
  --rl-nav-bar-color: #000;
  --rl-nav-bar-background: var(--rl-background-2);
  --rl-nav-bar-arrow-size: 16px;
  --rl-nav-bar-icon-color: var(--rl-primary-color);
  --rl-nav-bar-text-color: var(--rl-primary-color);
  --rl-nav-bar-title-font-size: var(--rl-font-size-lg);
  --rl-nav-bar-title-text-color: var(--rl-text-color);
  --rl-nav-bar-z-index: 1;
  --rl-nav-bar-disabled-opacity: var(--rl-disabled-opacity);
}
</style>

<style lang="scss" scoped>
.rl-nav-bar {
  background: var(--rl-navbar-background, transparent);
  z-index: var(--van-nav-bar-z-index);
  color: var(--rl-nav-bar-color);

  &__wrapper {
    &--fixed {
      z-index: var(--rl-nav-bar-z-index);
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  &__content {
    height: var(--rl-nav-bar-height);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &__left,
    &__right {
      display: flex;
      position: absolute;
      top: 0;
      bottom: 0;
      align-items: center;
      &__text {
        font-size: var(--rl-nav-bar-arrow-size);
        display: flex;
        align-items: baseline;
      }
    }

    &__title {
      padding: 0 15px;
      flex: auto;
      text-align: center;
      font-size: var(--rl-nav-bar-title-font-size);
      box-sizing: border-box;
    }

    &__left {
      left: 15px;
      &--hover {
        opacity: 0.7;
      }
    }
    &__right {
      right: 15px;
    }
  }
}
</style>
