<template>
  <Popup
    :mask-click="isMaskClick"
    @maskClick="maskClickHandle"
    :safe-area="false"
    type="bottom"
    ref="popupRef"
  >
    <div :class="bem({ safeAreaBottom })" :style="[drawerStyle, customStyle]">
      <div :class="bem('header')">
        <div :class="bem('header-title')">
          {{ title }}
        </div>
        <div :class="bem('header-close-icon')" @click="onClose">
          <Icon type="CloseOutline"></Icon>
        </div>
      </div>
      <div :class="bem('body')" :style="[bodyStyle]">
        <slot></slot>
      </div>
      <div :class="bem('footer')">
        <slot name="footer"></slot>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import { type Ref, ref, computed, getCurrentInstance, inject } from "vue";
import Popup from "../Popup/index.vue";
import Icon from "../Icon/index.vue";

const instance = getCurrentInstance();
const drawerHeight = ref();
const [name, bem] = createNamespace("drawer");
type DrawerProps = {
  maskClick?: any;
  title?: string;
  customStyle?: any;
  bodyStyle?: any;
  isMaskClick?: boolean;
  safeAreaBottom?: boolean;
};
const props = withDefaults(defineProps<DrawerProps>(), {
  isMaskClick: true,
});

const maskClickHandle = () => {
  props.maskClick?.();
  if (typeof pageOverflow.value === "boolean") pageOverflow.value = true;
};

const drawerStyle = computed(() => {
  const percent = drawerHeight.value < 300 ? "42%" : "21.4%";
  return {
    background: `linear-gradient(180deg, #bedcff 0%, #fff ${percent}, #fff 100%)`,
  };
});

const popupRef = ref();
const onClose = () => {
  popupRef.value.close();
  props.maskClick?.();
  if (typeof pageOverflow.value === "boolean") pageOverflow.value = true;
};

const pageOverflow = inject<Ref<boolean>>("pageOverflow", null);

defineExpose({
  open: () => {
    popupRef.value.open();
    if (typeof pageOverflow.value === "boolean") pageOverflow.value = false;

    setTimeout(() => {
      const query = uni.createSelectorQuery().in(instance);
      query
        .select(`.${name}`)
        .boundingClientRect((data: any) => {
          drawerHeight.value = data?.height;
        })
        .exec();
    }, 20);
  },
  close: () => {
    onClose();
  },
});
</script>

<script lang="ts">
export default {
  name: "rl-drawer",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-drawer {
  --rl-drawer-text-color: var(--rl-main-text-color);
  --rl-drawer-text-size: var(--rl-font-size-lg);
  --rl-drawer-icon-size: var(--rl-font-size-lg);
}
.rl-drawer {
  max-height: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  color: var(--rl-drawer-text-color);
  border-radius: 20px 20px 0 0;
  overflow-y: auto;

  &--safeAreaBottom {
    width: 100%;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__header {
    position: relative;
    padding: 15px 15px 20px;

    &-title {
      color: var(--rl-drawer-text-color);
      font-size: var(--rl-drawer-text-size);
      min-height: 24px;
      text-align: center;
    }
    &-close-icon {
      top: 15px;
      right: 15px;
      position: absolute;
      font-size: var(--rl-drawer-icon-size);
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    min-height: 20vh;
    max-height: 85vh;
    overflow: hidden;
  }

  &__footer {
    padding-bottom: var(--window-bottom);
  }
}
</style>
