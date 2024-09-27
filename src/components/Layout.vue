<template>
  <div :class="bem({ statusBar, safeAreaBottom })" :style="[pageStyle]">
    <div :style="{ height: statusBarHeight + 'px' }"></div>
    <rl-navbar :title="navTitle" fixed />
    <div :class="bem('content')" :style="pageContentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide } from "vue";
import { createNamespace } from "@/uni_modules/dyrl_ui/components/utils";
import { last } from "lodash-es";
import pagesConfig from "@/pages.json";

defineProps<{
  backgroundImageUrl?: string;
  eduBackgroundImageUrl?: string;
  statusBar?: boolean;
  safeAreaBottom?: boolean;
}>();

const [_, bem] = createNamespace("page-container");
const loading = ref(true);
const statusBarHeight = ref(0);
const overflow = ref(true);
provide("rl-statusBarHeight", statusBarHeight);
provide("pageOverflow", overflow);
provide("pageReady", loading);

const page = getCurrentPages();
const navTitle = computed(() => {
  const currentRoute = last(page).route;
  const routeConfig = pagesConfig.pages.find(
    (item) => item.path === currentRoute
  );
  return routeConfig?.name || "";
});

const pageStyle = computed(() => {
  return {};
});

const pageContentStyle = computed(() => ({
  overflowY: overflow.value ? "auto" : "hidden",
}));

onMounted(async () => {});

defineExpose({
  loading,
});
</script>

<style scoped lang="scss">
.rl-page-container {
  padding: 0 12px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #eff2f5;
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  &--status-bar {
    padding-top: var(--status-bar-height);
  }

  &--safeAreaBottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
