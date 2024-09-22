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
import Icon from "../Icon/index.vue";

defineProps<{
  arrow?: boolean;
  onClick?: () => void;
}>();
const classPrefix = `list-item`;
</script>

<template>
  <div :class="classPrefix" @click="onClick">
    <div :class="`${classPrefix}-content`">
      <div v-if="$slots.prefix" :class="`${classPrefix}-content-prefix`">
        <slot name="prefix"></slot>
      </div>
      <div :class="`${classPrefix}-content-main`">
        <div v-if="$slots.title" :class="`${classPrefix}-title`">
          <slot name="title"></slot>
        </div>
        <slot></slot>
        <div v-if="$slots.description" :class="`${classPrefix}-description`">
          <slot name="description"></slot>
        </div>
      </div>
      <div v-if="$slots.extra" :class="`${classPrefix}-content-extra`">
        <slot name="extra"></slot>
      </div>
      <div v-if="arrow" :class="`${classPrefix}-content-arrow`">
        <Icon type="RightOutline"></Icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$class-prefix-list: "list-item";
.#{$class-prefix-list} {
  display: block;
  padding-left: var(--padding-left);
  position: relative;
  background-color: var(--background-color);
  line-height: 1.5;
  font-size: var(--rl-font-size-7);

  &-title,
  &-description {
    color: var(--color);
    font-size: var(--rl-font-size-main);
  }

  &-content {
    display: flex;
    align-items: var(--rl-list-item-align-items);
    justify-content: flex-start;
    border-top: var(--border-inner);
    padding-right: var(--padding-right);

    &-prefix {
      width: var(--prefix-width);
      flex: none;
      padding-right: var(--prefix-padding-right);
    }

    &-main {
      flex: auto;
      padding: 12px 0;
    }

    &-extra {
      flex: none;
      padding-left: 12px;
      font-size: var(--rl-font-size-7);
      color: var(--color);
      max-width: var(--extra-max-width);
    }

    &-arrow {
      flex: none;
      display: flex;
      align-items: center;
      margin-left: 4px;
      color: var(--rl-color-light);
      font-size: 14px;
    }
  }

  &-disabled {
    cursor: not-allowed;

    & > .#{$class-prefix-list}-content {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
</style>
