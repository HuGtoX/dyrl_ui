<template>
  <view class="content">
    <rl-cell
      v-for="item in components"
      clickable
      :key="item.name"
      :title="item.name"
      @click="() => clickHandle(item.path)"
      arrow />
  </view>
</template>

<script setup lang="ts">
import pagesConfig from "@/pages.json";

const clickHandle = (path: string) => {
  console.log("-- [ path ] --", path);
  uni.navigateTo({ url: `/${path}` });
};
const components = pagesConfig.pages
  .filter((item) => item?.type !== "home")
  .map((page) => {
    return {
      name: page.name,
      path: page.path,
    };
  });

console.log("-- [ pagesConfig ] --", pagesConfig);
</script>

<style>
.content {
  background: #eff2f5;
  height: 100vh;
}
</style>
