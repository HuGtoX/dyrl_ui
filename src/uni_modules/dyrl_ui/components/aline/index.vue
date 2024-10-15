<template>
  <div
    role="separator"
    :class="
      bem({
        dashed: dashed,
        hairline: hairline,
        vertical: vertical,
        [`content-${contentPosition}`]: !!$slots.default && !vertical,
      })
    "
  >
    <slot v-if="!vertical"></slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";

type Line = {
  dashed?: boolean;
  hairline?: boolean;
  vertical?: boolean;
  contentPosition?: "left" | "center" | "right";
};
defineProps<Line>();

const [name, bem] = createNamespace("line");
</script>

<script lang="ts">
export default {
  name: "Line",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-line {
  --rl-divider-margin: var(--rl-padding-md) 0;
  --rl-divider-vertical-margin: 0 var(--rl-padding-xs);
  --rl-divider-text-color: var(--rl-text-color-2);
  --rl-divider-font-size: var(--rl-font-size-md);
  --rl-divider-line-height: 24px;
  --rl-divider-border-color: var(--rl-border-color);
  --rl-divider-content-padding: var(--rl-padding-md);
  --rl-divider-content-left-width: 10%;
  --rl-divider-content-right-width: 10%;
}

.rl-line {
  display: flex;
  align-items: center;
  margin: var(--rl-divider-margin);
  color: var(--rl-divider-text-color);
  font-size: var(--rl-divider-font-size);
  line-height: var(--rl-divider-line-height);
  border-color: var(--rl-divider-border-color);
  border-style: solid;
  border-width: 0;

  &::before,
  &::after {
    display: block;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: inherit;
    border-style: inherit;
    border-width: var(--rl-border-width) 0 0;
  }

  &::before {
    content: "";
  }

  &--hairline {
    &::before,
    &::after {
      transform: scaleY(0.5);
    }
  }

  &--dashed {
    border-style: dashed;
  }

  &--content-center,
  &--content-left,
  &--content-right {
    &::before {
      margin-right: var(--rl-divider-content-padding);
    }

    &::after {
      margin-left: var(--rl-divider-content-padding);
      content: "";
    }
  }

  &--content-left {
    &::before {
      max-width: var(--rl-divider-content-left-width);
    }
  }

  &--content-right {
    &::after {
      max-width: var(--rl-divider-content-right-width);
    }
  }

  &--vertical {
    display: inline-block;
    width: var(--rl-border-width);
    height: 1em;
    margin: var(--rl-divider-vertical-margin);
    vertical-align: middle;

    &::before {
      height: 100%;
      border-width: 0 0 0 var(--rl-border-width);
    }

    &::after {
      display: none;
    }

    &.rl-divider--hairline {
      &::before {
        transform: scaleX(0.5);
      }
    }
  }
}
</style>
