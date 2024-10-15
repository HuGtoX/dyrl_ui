<script setup lang="ts">

const props = defineProps<{
  position: "top" | "bottom";
}>();
</script>

<template>
  <view :class="['safe-area', `safe-area-position-${props.position}`]"></view>
</template>

<style scoped lang="scss">
.safe-area {
  //--multiple: var(--safe-area-multiple, 1);
  display: block;
  width: 100%;

  &-position-top {
    //padding-top: calc(env(safe-area-inset-top) * var(--multiple));
    padding-top: 40px;
  }

  &-position-bottom {
    // padding-bottom: calc(env(safe-area-inset-bottom) * var(--multiple));
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
