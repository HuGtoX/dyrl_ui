<template>
  <!-- :class="bem([type, vertical])" -->
  <div :class="bem([type, { vertical }])">
    <slot name="icon">
      <!-- 这里后期需要修改，否则无法统一css变量 -->
      <Icon
        spin
        v-if="type === 'circular'"
        :size="addUnit(size)"
        :color="color"
        type="LoadingOutlined"
      ></Icon>
      <span v-else :class="bem('spinner', type)" :style="spinnerStyle">
        <i
          v-for="item in 12"
          :key="item"
          :class="bem('line', String(item + 1))"
        />
      </span>
    </slot>

    <span v-if="$slots.default" :class="bem('text')" :style="textStyle">
      <slot> </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { compact } from "lodash-es";
import Icon from "../Icon/index.vue";
import {
  type Numeric,
  addUnit,
  getSizeStyle,
  createNamespace,
  omitByUndefined,
} from "../utils";

type LoadingType = "circular" | "spinner";
const [name, bem] = createNamespace("loading");
type loadingProps = {
  size?: Numeric;
  type?: LoadingType;
  color?: string;
  vertical?: boolean;
  textSize?: Numeric;
  textColor?: string;
};

const props = withDefaults(defineProps<loadingProps>(), {
  type: "circular",
});

const spinnerStyle = computed(() =>
  compact([
    props.color && { color: props.color },
    props.size && getSizeStyle(props.size),
  ])
);

const textStyle = computed(() =>
  omitByUndefined({
    fontSize: addUnit(props.textSize),
    color: props.textColor ?? props.color,
  })
);
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    multipleSlots: true,
    styleIsolation: "apply-shared",
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
