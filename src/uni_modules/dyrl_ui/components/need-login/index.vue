<template>
  <div class="need-login" :style="emptyStyle" v-if="show">
    <Image
      prefix
      :style="imageStyle"
      src="/images/Auth/auth.png"
      mode="aspectFit"></Image>
    <text class="need-login-text"> 当前未登录，请登录查看</text>
    <div class="need-login-btn-wrapper">
      <slot>
        <Button block :onClick="toLogin" type="primary">登录</Button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../button/index.vue";
import Image from "../image/index.vue";
import { addUnit } from "../utils";
import { computed } from "vue";

type Numeric = string | number;
const props = withDefaults(
  defineProps<{
    width?: Numeric;
    height?: Numeric;
    show?: boolean;
    size?: Numeric;
    text?: string;
    textSize?: string;
  }>(),
  {
    textSize: "14px",
    size: 160,
  }
);

const toLogin = () => {
  uni.navigateTo({
    url: import.meta.env.VITE_LOGIN_PATH,
  });
};

const imageStyle = computed(() => {
  if (props.size) {
    return { width: addUnit(props.size), height: addUnit(props.size) };
  }
  return { width: addUnit(props.width), height: addUnit(props.height) };
});

const emptyStyle = computed(() => {
  const style = {};
  return style;
});
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.need-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-btn-wrapper {
    width: 90px;
    padding: 15px 0;
  }
}
</style>
