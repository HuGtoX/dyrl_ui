<template>
  <swiper-item>
    <slot></slot>
  </swiper-item>
</template>

<script setup lang="ts">
import { createNamespace } from "../utils";
import { TABS_KEY } from "../Tabs/index";
import { useParent } from "../../hooks";

const { parent } = useParent(TABS_KEY);
const [_, bem] = createNamespace("rl-tab-item");
type TabItemProps = {
  name?: string;
  test?: string;
};
defineProps<TabItemProps>();
</script>

<script lang="ts">
export default {
  name: "rl-tab-item",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped></style>
