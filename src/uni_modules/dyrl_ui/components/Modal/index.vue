<template>
  <Popup :mask-click="isMaskClick" ref="popupRef">
    <div :style="modalStyle" :class="name">
      <div :style="titleStyle" v-if="type === 'dialog'" :class="bem('header')">
        <div :class="bem('header-title')">
          {{ title }}
        </div>
        <div :class="bem('header-close-icon')" @click="onClose">
          <Icon type="CloseOutline"></Icon>
        </div>
      </div>

      <div v-if="type === 'dialog'" :class="bem('dialog-body')" :style="customStyle">
        <slot></slot>
      </div>

      <div v-if="type === 'confirm'" :class="bem('confirm-body')" :style="customStyle">
        <div :class="bem('confirm-body-title')">
          <Icon size="20" :color="iconColor" type="ExclamationCircleFill" />
          <span style="margin-left: 8px">{{ modalState.title }}</span>
        </div>
        <div :class="bem('confirm-body-content')">
          <slot name="confirmBody">
            {{ modalState.content }}
          </slot>
        </div>
      </div>

      <div v-if="type === 'confirm'" :class="bem('footer')">
        <slot name="footer">
          <Button
            v-if="showCancelButton"
            :onClick="onCancel"
            :customStyle="buttonStyle"
            size="large"
            block
            >取消</Button
          >
          <Button
            :customStyle="[buttonStyle, { borderLeft: 0, color: 'var(--rl-blue)' }]"
            :loading-text="false"
            :onClick="onConfirm"
            size="large"
            block
            >确认</Button
          >
        </slot>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import { ref, computed } from "vue";
import Popup from "../Popup/index.vue";
import Icon from "../Icon/index.vue";
import Button from "../Button/index.vue";

const [name, bem] = createNamespace("modal");
type ModalProps = {
  type?: "confirm" | "dialog";
  isMaskClick?: boolean;
  customStyle?: any;
  modalStyle?: any;
  width?: string;
  title?: string;
  showCancelButton?: boolean;
  titleStyle?: any;
  iconColor?: string;
};
const props = withDefaults(defineProps<ModalProps>(), {
  type: "dialog",
  showCancelButton: true,
  iconColor: "#DD4747",
});

const isMaskClick = computed(() => {
  return props.type === "dialog" || props.isMaskClick;
});

type ModalConfirmState = {
  title?: string;
  content?: string;
  onConfirm?: () => Promise<void>;
  onCancel?: () => Promise<void>;
};
const modalState = ref<ModalConfirmState>({});
const buttonStyle = computed(() => {
  return {
    "--rl-button-default-border-color": "var(--rl-gray-3)",
    flex: 1,
    borderRadius: 0,
  };
});

const popupRef = ref();
const onClose = () => {
  popupRef.value.close();
};

const onCancel = async () => {
  await modalState.value.onCancel?.();
  onClose();
};

const onConfirm = async () => {
  try {
    await modalState.value.onConfirm?.();
    popupRef.value.close();
  } catch (e) {
    throw Error();
  }
};

defineExpose({
  open: (payload?: ModalConfirmState) => {
    modalState.value = payload ?? {};
    popupRef.value.open();
  },
  close: onClose,
});
</script>

<script lang="ts">
export default {
  name: "rl-modal",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.rl-modal {
  --rl-modal-radius: 20px;
  --rl-modal-title-text-size: var(--rl-font-size-lg);
  --rl-modal-icon-size: var(--rl-font-size-lg);
  --rl-modal-confirm-content-color: var(--rl-text-color-2);
  --rl-modal-confirm-content-size: var(--rl-font-size-md);
}

.rl-modal {
  display: flex;
  flex-direction: column;
  width: 320px;
  background: linear-gradient(180deg, #bedcff 0%, #fff 24%, #fff 100%);
  border-radius: var(--rl-modal-radius);
  box-sizing: border-box;
  max-height: 80vh;
  overflow: hidden;

  &__header {
    position: relative;
    padding: 15px 15px 20px;

    &-title {
      color: var(--rl-modal-text-color);
      font-size: var(--rl-modal-title-text-size);
      min-height: 24px;
      text-align: center;
    }
    &-close-icon {
      top: 15px;
      right: 15px;
      position: absolute;
      font-size: var(--rl-modal-icon-size);
    }
  }

  &__dialog-body,
  &__confirm-body {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
  }

  &__dialog-body {
    padding: var(--rl-padding-md);
    min-height: 60px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__confirm-body {
    padding: 30px 15px 20px;
    &-title {
      text-align: center;
      color: var(--rl-modal-text-color);
      font-size: var(--rl-modal-title-text-size);
    }

    &-content {
      text-align: center;
      color: var(--rl-modal-confirm-content-color);
      font-size: var(--rl-modal-confirm-content-size);
      margin-top: 10px;
    }
  }

  &__confirm {
    color: #bedcff;
    --rl-button-radius: 0;
    --rl-button-default-border-color: var(--rl-gray-3);
  }

  &__footer {
    display: flex;
    overflow: hidden;
    user-select: none;
  }
}
</style>
