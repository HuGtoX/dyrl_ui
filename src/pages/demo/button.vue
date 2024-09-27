<template>
  <Layout>
    <rl-space direction="vertical" size="12">
      <rl-section type="line" title="按钮类型">
        <rl-space wrap size="8">
          <rl-button>默认按钮</rl-button>
          <rl-button type="primary">主要按钮</rl-button>
          <rl-button type="success">成功按钮</rl-button>
          <rl-button type="warning">警告按钮</rl-button>
          <rl-button type="danger">危险按钮</rl-button>
          <rl-button type="text">文字按钮</rl-button>
          <rl-button type="link">链接按钮</rl-button>
        </rl-space>
      </rl-section>

      <rl-section type="line" title="块级按钮">
        <rl-button block type="primary">block</rl-button>
      </rl-section>

      <rl-section type="line" title="按钮形状">
        <rl-space size="8">
          <rl-button type="success">round</rl-button>
          <rl-button shape="square" type="primary">square</rl-button>
        </rl-space>
      </rl-section>

      <rl-section type="line" title="图标按钮">
        <rl-space size="8">
          <rl-button icon="time" type="success">round</rl-button>
          <rl-button icon="download" shape="square" type="primary">
            square
          </rl-button>
        </rl-space>
      </rl-section>

      <rl-section type="line" title="加载状态">
        <rl-space size="8">
          <rl-button :loading="true" type="primary">基本loading</rl-button>
          <rl-button :onClick="handleClick" type="primary">
            异步加载loading
          </rl-button>
        </rl-space>
      </rl-section>
    </rl-space>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";

const handleClick = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, 2000);
  });
};
</script>

<style></style>
