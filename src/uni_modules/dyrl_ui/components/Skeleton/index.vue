<template>
  <div :class="name">
    <div v-if="loading">
      <div :style="cardStyle" v-for="(item, index) in cardRows" :key="index">
        <div v-if="card" :class="bem('card__wrapper')">
          <div
            :style="avatarStyle"
            :class="[bem('avatar', [size]), animationClass, avatarClass]"
          ></div>
          <div :class="bem('card__wrapper__sub')">
            <div
              v-for="(item, index) in rowWidth"
              :key="index"
              :style="[{ width: item }, lineStyle]"
              :class="[bem('line', [size]), animationClass, lineClass]"
            ></div>
          </div>
        </div>

        <div
          :style="lineStyle"
          :class="[bem('line', [size]), animationClass, lineClass]"
          v-for="(item, index) in rows"
          :key="index"
        ></div>
      </div>
    </div>

    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { createNamespace, addUnit } from "../utils";
import { computed } from "vue";
const [name, bem] = createNamespace("skeleton");
type SkeletonProps = {
  loading?: boolean;
  avatar?: boolean;
  animation?: boolean;
  rowWidth?: string[];
  rows?: number;
  cardRows?: number;
  card?: boolean;
  size?: "large" | "small" | "default";
  shape?: "round" | "square" | "none";
  avatarStyle?: any;
  lineStyle?: any;
  cardMargin?: number | string;
  background?: string;
  cardRadius?: number | string;
  padding?: number | string;
};
const props = withDefaults(defineProps<SkeletonProps>(), {
  animation: true,
  size: "default",
  shape: "square",
  cardMargin: 15,
  background: "transparent",
  cardRadius: "10px",
  padding: 10,
  cardRows: 1,
  rows: 3,
  rowWidth: () => ["70%", "80%"],
});
const avatarClass = computed(() => {
  return `${name}--${props.shape}`;
});

const cardStyle = computed(() => {
  return {
    marginBottom: addUnit(props.cardMargin),
    background: props.background,
    borderRadius: addUnit(props.cardRadius),
    padding: addUnit(props.padding),
  };
});

const lineClass = computed(() => {
  let shape = props.shape;
  if (props.shape === "round") shape === "square";

  return `${name}--${shape}`;
});
const animationClass = computed(() => {
  return { [`${name}--animation`]: props.animation };
});
</script>

<script lang="ts">
export default {
  name: "rl-skeleton",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-skeleton {
  --rl-border-round: var(--rl-radius-max);
  --rl-border-radius: var(--rl-radius-md);
}

@mixin background {
  background: linear-gradient(90deg, #f1f2f4 25%, #e6e6e6 37%, #f1f2f4 50%);
  background-size: 400% 100%;
}
.rl-skeleton {
  &__line {
    @include background;
  }
  &__line--default {
    height: 16px;
    margin-bottom: 10px;
  }
  &__line--small {
    height: 12x;
    margin-bottom: 15px;
  }
  &__line--large {
    height: 24px;
    margin-bottom: 15px;
  }

  &__card__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;

    &__sub {
      flex: 1;
    }
  }

  &--square {
    border-radius: var(--rl-border-radius);
  }

  &--round {
    border-radius: var(--rl-border-round);
  }

  &__avatar {
    @include background;
    margin-right: 8px;
  }
  &__avatar--default {
    width: 42px;
    height: 42px;
  }
  &__avatar--small {
    width: 25px;
    height: 25px;
  }
  &__avatar--large {
    width: 100px;
    height: 100px;
  }

  &--animation {
    animation: skeleton 1.8s ease infinite;
  }
  @keyframes skeleton {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
