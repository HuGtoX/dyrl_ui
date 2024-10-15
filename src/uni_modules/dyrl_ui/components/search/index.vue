<template>
  <div :class="name">
    <div
      :class="bem('content')"
      :style="[
        {
          backgroundColor: bgColor,
          borderRadius: shape == 'round' ? '100px' : '4px',
          borderColor: borderColor,
        },
      ]">
      <div :class="bem('content__disabled')" v-if="disabled"></div>

      <input
        confirm-type="search"
        @blur="blur"
        :value="keyword"
        @confirm="search"
        @input="inputChange"
        :disabled="disabled"
        @focus="getFocus"
        :focus="focus"
        :maxlength="maxlength"
        :placeholder-class="bem('content__input--placeholder')"
        :placeholder="placeholder"
        :placeholder-style="`color: ${placeholderColor}`"
        :class="bem('content__input')"
        type="text"
        :style="[
          {
            textAlign: inputAlign,
            color: color,
            backgroundColor: 'transparent',
            height: addUnit(height),
          },
          inputStyle,
        ]" />
      <div
        :class="[bem('content__icon'), bem('content__close')]"
        v-if="keyword && clearabled && focused"
        @tap="clear">
        <Icon type="reject" color="#ffffff" style="line-height: 12px"></Icon>
      </div>

      <slot name="prefix">
        <div :class="bem('content__icon')">
          <Icon
            @tap="clickIcon"
            :size="searchIconSize"
            type="index-search"
            :color="searchIconColor ? searchIconColor : color"></Icon>
        </div>
      </slot>
      <slot name="suffix"></slot>
    </div>

    <text
      :style="[actionStyle]"
      class="uv-search__action"
      :class="[(showActionBtn || show) && 'uv-search__action--active']"
      @tap.stop.prevent="custom"
      >{{ actionText }}</text
    >
  </div>
</template>

<script setup lang="ts">
import Icon from "../icon/index.vue";
import { createNamespace, addUnit } from "../utils";

const [name, bem] = createNamespace("search");

/**
 * search 搜索框
 * @description 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。
 * @property {String}			value/v-model				输入框初始值
 * @property {String}			shape				搜索框形状，round-圆形，square-方形（默认 'round' ）
 * @property {String}			bgColor				搜索框背景颜色（默认 '#f2f2f2' ）
 * @property {String}			placeholder			占位文字内容（默认 '请输入关键字' ）
 * @property {Boolean}			clearabled			是否启用清除控件（默认 true ）
 * @property {Boolean}			focus				是否自动获得焦点（默认 false ）
 * @property {Boolean}			showAction			是否显示右侧控件（默认 true ）
 * @property {Object}			actionStyle			右侧控件的样式，对象形式
 * @property {String}			actionText			右侧控件文字（默认 '搜索' ）
 * @property {String}			inputAlign			输入框内容水平对齐方式 （默认 'left' ）
 * @property {Object}			inputStyle			自定义输入框样式，对象形式
 * @property {Boolean}			disabled			是否启用输入框（默认 false ）
 * @property {String}			borderColor			边框颜色，配置了颜色，才会有边框 (默认 'transparent' )
 * @property {String}			searchIconColor		搜索图标的颜色，默认同输入框字体颜色 (默认 '#909399' )
 * @property {Number | String}	searchIconSize 搜索图标的字体，默认22
 * @property {String}			color				输入框字体颜色（默认 '#606266' ）
 * @property {String}			placeholderColor	placeholder的颜色（默认 '#909399' ）
 * @property {String}			searchIcon			输入框左边的图标，可以为uvui图标名称或图片路径  (默认 'search' )
 * @property {String}			margin				组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"   (默认 '0' )
 * @property {Boolean} 			animation			是否开启动画，见上方说明（默认 false ）
 * @property {String | Number}	maxlength			输入框最大能输入的长度，-1为不限制长度  (默认 '-1' )
 * @property {String | Number}	height				输入框高度，单位px（默认 64 ）
 * @property {String | Number}	label				搜索框左边显示内容
 * @property {Object} boxStyle 自定义内容框样式，设置padding
 * @property {Object}			customStyle			定义需要用到的外部样式
 *
 * @event {Function} change 输入框内容发生变化时触发
 * @event {Function} search 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
 * @event {Function} custom 用户点击右侧控件时触发
 * @event {Function} clear 用户点击清除按钮时触发
 * @example <uv-search placeholder="日照香炉生紫烟" v-model="keyword"></uv-search>
 */
type SearchProps = {
  disabled?: boolean;
  searchIconSize?: number | string;
  searchIcon?: string;
  searchIconColor?: string;
  placeholder?: string;
  placeholderColor?: string;
  maxlength?: number;
  actionText?: string;
  color?: string;
  focus?: boolean;
  animation?: boolean;
  clearabled?: boolean;
  showAction?: boolean;
  actionStyle?: any;
  inputStyle?: any;
  shape?: "round" | "square";
  bgColor?: string;
  height?: string;
  inputAlign?: "left" | "center" | "right";
  borderColor?: string;
};
const props = withDefaults(defineProps<SearchProps>(), {
  searchIcon: "index-search",
  placeholder: "搜索内容",
  // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
  maxlength: -1,
  searchIconColor: "#909399",
  clearabled: true,
  bgColor: "rgba(90, 128, 174, 0.05)",
  borderColor: "rgba(80, 100, 125, 0.05)",
  shape: "round",
  inputAlign: "left",
  height: "32",
});
const emit = defineEmits([
  "blur",
  "search",
  "clear",
  "input",
  "update:modelValue",
  "change",
  "focus",
  "custom",
]);
const keyword = ref("");
const focused = ref(true);
const show = ref(false);
const clickIcon = () => {};

const showActionBtn = computed(() => {
  return !props.animation && props.showAction;
});
// 点击右边自定义按钮的事件
const custom = () => {
  emit("custom", keyword.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};

// 获取焦点
const getFocus = () => {
  focused.value = true;
  // 开启右侧搜索按钮展开的动画效果
  if (props.animation && props.showAction) show.value = true;
  emit("focus", keyword.value);
};

// 失去焦点
const blur = () => {
  // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
  // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
  setTimeout(() => {
    focused.value = false;
  }, 100);
  show.value = false;
  emit("blur", keyword.value);
};

// 确定搜索
const search = (e) => {
  emit("search", e.detail.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};

const keywordChange = () => {
  emit("input", keyword.value);
  emit("update:modelValue", keyword.value);
  emit("change", keyword.value);
};

const inputChange = (e) => {
  keyword.value = e.detail.value;
  keywordChange();
};
// 清空输入
// 也可以作为用户通过this.$refs形式调用清空输入框内容
const clear = () => {
  keyword.value = "";
  nextTick(() => {
    emit("clear");
  });
  keywordChange();
};

defineExpose({
  clear,
});
</script>

<script lang="ts">
export default {
  name: "Search",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
$uv-search-content-padding: 0 10px !default;
$uv-search-label-color: var(--rl-main-text-color) !default;
$uv-search-label-font-size: 14px !default;
$uv-search-label-margin: 0 4px !default;
$uv-search-close-size: 20px !default;
$uv-search-close-radius: 100px !default;
$uv-search-close-bgColor: #c6c7cb !default;
$uv-search-close-transform: scale(0.82) !default;
$uv-search-input-font-size: 15px !default;
$uv-search-input-margin: 0 15px 0 5px !default;
$uv-search-input-color: var(--rl-main-text-color) !default;
$uv-search-input-placeholder-color: #8d969f !default;
$uv-search-action-font-size: 14px !default;
$uv-search-action-color: var(--rl-main-text-color) !default;
$uv-search-action-width: 0 !default;
$uv-search-action-active-width: 40px !default;
$uv-search-action-margin-left: 5px !default;
/* #ifdef H5 */
// iOS15在H5下，hx的某些版本，input type=search时，会多了一个搜索图标，进行移除
[type="search"]::-webkit-search-decoration {
  display: none;
}
/* #endif */
.rl-search {
  display: flex;
  align-items: center;
  &__content {
    position: relative;
    display: flex;
    align-items: center;
    padding: $uv-search-content-padding;
    flex: 1;
    justify-content: space-between;
    border-width: 1px;
    border-color: transparent;
    border-style: solid;
    overflow: hidden;
    &__icon {
      display: flex;
      align-items: center;
    }
    &__label {
      color: $uv-search-label-color;
      font-size: $uv-search-label-font-size;
      margin: $uv-search-label-margin;
    }
    &__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $uv-search-close-size;
      height: $uv-search-close-size;
      border-top-left-radius: $uv-search-close-radius;
      border-top-right-radius: $uv-search-close-radius;
      border-bottom-left-radius: $uv-search-close-radius;
      border-bottom-right-radius: $uv-search-close-radius;
      background-color: $uv-search-close-bgColor;
      margin-right: 5px;
      transform: $uv-search-close-transform;
    }
    &__input {
      flex: 1;
      font-size: $uv-search-input-font-size;
      line-height: 1;
      margin: $uv-search-input-margin;
      color: $uv-search-input-color;
      &--placeholder {
        color: $uv-search-input-placeholder-color;
      }
    }
    &__disabled {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 2;
    }
  }
  &__action {
    font-size: $uv-search-action-font-size;
    color: $uv-search-action-color;
    width: $uv-search-action-width;
    overflow: hidden;
    transition-property: width;
    transition-duration: 0.3s;
    /* #ifndef APP-NVUE */
    white-space: nowrap;
    /* #endif */
    text-align: center;
    &--active {
      width: $uv-search-action-active-width;
      margin-left: $uv-search-action-margin-left;
    }
  }
}
</style>
