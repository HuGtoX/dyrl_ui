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
import type { CSSProperties } from "vue";

export type ListProps = {
  mode?: "default" | "card"; // 默认是整宽的列表，card 模式下展示为带 margin 和圆角的卡片
  style?: CSSProperties & {
    "--active-background-color"?: string;
    "--align-items"?: string;
    "--border-bottom"?: string;
    "--border-inner"?: string;
    "--border-top"?: string;
    "--extra-max-width"?: string;
    "--font-size"?: string;
    "--header-font-size"?: string;
    "--padding-left"?: string;
    "--padding-right"?: string;
    "--prefix-padding-right"?: string;
    "--prefix-width"?: string;
  };
};

const classPrefix = `list`;

withDefaults(defineProps<ListProps>(), {
  mode: "card",
});
</script>

<template>
  <div :class="[classPrefix, `${classPrefix}-${mode}`]">
    <div v-if="$slots.header" :class="`${classPrefix}-header`">
      <slot name="header"></slot>
    </div>
    <div :class="`${classPrefix}-body`">
      <div :class="`${classPrefix}-body-inner`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$class-prefix-list: "list";
.#{$class-prefix-list} {
  --header-font-size: var(--rl-font-size-7);
  --prefix-width: "auto";
  --prefix-padding-right: 12px;
  --align-items: center;
  --active-background-color: var(--rl-color-border);
  --border-inner: solid 1px var(--rl-color-border);
  --border-top: solid 1px var(--rl-color-border);
  --border-bottom: solid 1px var(--rl-color-border);
  --padding-left: 12px;
  --padding-right: 12px;
  --font-size: var(--rl-font-size-9);
  --extra-max-width: 70%;
  --color: var(--rl-color-weak);
  --background-color: var(--rl-list-background, transparent);

  &-header {
    color: var(--rl-color-weak);
    font-size: var(--header-font-size);
    padding: 8px var(--padding-right) 8px var(--padding-left);
  }

  &-body {
    background-color: var(--background-color);
    overflow: hidden;
    font-size: var(--font-size);
  }

  &-body-inner {
    margin-top: -1px;
  }

  &-default {
    .#{$class-prefix-list}-body {
      border-top: var(--border-top);
      border-bottom: var(--border-bottom);
    }
  }

  &-card {
    margin: var(--rl-list-card-padding, 5px 15px);

    .#{$class-prefix-list}-body {
      border-radius: 10px;
    }

    .#{$class-prefix-list}-header {
      padding-left: 0;
    }
  }
}
</style>
