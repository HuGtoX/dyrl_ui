<template>
  <Layout>
    <rl-space direction="vertical" size="12">
      <rl-section type="line" title="基础用法">
        <rl-image src="/static/images/demo.jpeg" size="70" />
      </rl-section>

      <rl-section type="line" title="填充模式">
        <rl-grid :gap="[10, 10]" :columns="4">
          <rl-grid-item v-for="item in mode" :key="item">
            <div class="flex flex-col justify-center items-center gap-1">
              <rl-image
                class="bg-gray"
                :mode="item"
                src="/static/images/demo.jpeg"
                width="70"
                height="70" />
              <rl-text>{{ item }}</rl-text>
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>

      <rl-section type="line" title="圆形图片">
        <rl-grid :gap="[10, 10]" :columns="4">
          <rl-grid-item v-for="item in mode" :key="item">
            <div class="flex flex-col justify-center items-center gap-1">
              <rl-image
                class="bg-gray"
                src="/static/images/demo.jpeg"
                :mode="item"
                size="70"
                round />
              <rl-text>{{ item }}</rl-text>
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>

      <rl-section type="line" title="加载失败提示">
        <rl-space size="10">
          <rl-text direction="vertical">
            <rl-image errIcon src="/" size="100" />
            <rl-text>Icon提示</rl-text>
          </rl-text>
          <rl-text direction="vertical">
            <rl-image src="/" size="100" />
            <rl-text>文字提示</rl-text>
          </rl-text>
        </rl-space>
      </rl-section>
    </rl-space>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
const mode = ["aspectFill", "aspectFit", "scaleToFill", "widthFix"] as const;
</script>

<style scoped>
:deep(.rl-text) {
  --rl-text-color: #646566;
}
</style>
