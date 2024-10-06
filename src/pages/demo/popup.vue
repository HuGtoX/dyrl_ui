<template>
  <Layout>
    <rl-section :padding="[10, 0]" type="line" title="基础用法">
      <rl-space wrap>
        <rl-button shape="square" type="primary" @click="open('top')">
          <text class="button-text">顶部</text>
        </rl-button>
        <rl-button shape="square" type="primary" @click="open('bottom')">
          <text class="button-text">底部</text>
        </rl-button>
        <rl-button shape="square" type="primary" @click="open('center')">
          <text class="button-text">居中</text>
        </rl-button>
        <rl-button shape="square" type="primary" @click="open('left')">
          <text class="button-text">左侧</text>
        </rl-button>
        <rl-button shape="square" type="primary" @click="open('right')">
          <text class="button-text">右侧</text>
        </rl-button>
      </rl-space>
    </rl-section>

    <rl-popup background-color="#fff" type="bottom" ref="popup">
      <div class="p-20px flex justify-center">Popup 内容</div>
    </rl-popup>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";

const popupPosition = ref("");
const popup = ref();
const open = (position: string) => {
  popupPosition.value = position;
  popup.value.open(position);
};
</script>

<style scoped></style>
