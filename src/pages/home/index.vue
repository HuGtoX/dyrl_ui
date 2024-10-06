<template>
  <view class="content">
    <rl-section :title="key" v-for="(value, key) in computedCom" :key="key">
      <rl-space fill direction="vertical" size="12">
        <rl-cell
          v-for="item in value"
          clickable
          radius="12"
          :key="item.name"
          :title="item.name"
          @click="() => clickHandle(item.path)"
          arrow />
      </rl-space>
    </rl-section>
  </view>
</template>

<script setup lang="ts">
import pagesConfig from "@/pages.json";
import { groupBy } from "lodash-es";

const clickHandle = (path: string) => {
  console.log("-- [ path ] --", path);
  uni.navigateTo({ url: `/${path}` });
};

const computedCom: Ref<Record<string, any[]>> = computed(() => {
  return groupBy(
    pagesConfig.pages.filter((item) => item?.type !== "home"),
    "key"
  );
});
</script>

<style scoped>
.content {
  background: #eff2f5;
  padding: 10px;
  height: 100vh;
}
</style>
