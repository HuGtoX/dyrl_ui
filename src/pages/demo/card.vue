<template>
  <Layout>
    <rl-space direction="vertical" size="12">
      <rl-section type="line" title="基础用法">
        <rl-card title="标题"></rl-card>
      </rl-section>

      <rl-section type="line" title="其他用法">
        <rl-card
          :border="false"
          title="回看"
          subText="查看回看记录"
          extraText="1小时前"
          :footerText="dayjs().format('YYYY-MM-DD HH:mm:ss')"
          linkUrl="demo">
        </rl-card>
      </rl-section>
    </rl-space>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import dayjs from "dayjs";
</script>

<style></style>
