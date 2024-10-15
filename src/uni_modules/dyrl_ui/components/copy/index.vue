<template>
  <div :class="name">
    <span v-if="showValue">{{ value }}</span>
    <div @click="copyClick" :class="bem('icon')">
      <Icon :color="iconColor" :type="type"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import Icon from "../icon/index.vue";

const [name, bem] = createNamespace("copy");
type CopyProps = {
  iconColor?: string;
  value?: any;
  showValue?: boolean;
  type?: string;
};
const props = withDefaults(defineProps<CopyProps>(), {
  showValue: true,
  type: "copy",
});

const copyClick = () => {
  uni.setClipboardData({
    data: props.value,
    success: function () {
      console.log("success");
    },
  });
};
</script>

<script lang="ts">
export default {
  name: "com",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-copy {
  display: inline-flex;
  align-items: center;

  &__icon {
    display: inline-block;
    padding: 0 6px;
  }
}
</style>
