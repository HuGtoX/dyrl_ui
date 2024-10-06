<template>
  <Layout>
    <rl-space direction="vertical" size="12">
      <rl-section type="line" title="基础用法">
        <rl-cell label="副标题" title="标题" value="内容" />
        <rl-cell center label="副标题" title="标题" value="内容居中" />
      </rl-section>

      <rl-section type="line" title="Clickable">
        <rl-cell clickable title="点击反馈" value="内容" arrow />
        <rl-cell
          center
          icon="share"
          clickable
          title="点击反馈"
          value="内容"
          arrow />
      </rl-section>

      <rl-section type="line" title="插槽">
        <rl-cell title="文件名" center>
          <template #prefix>
            <rl-image
              radius="4"
              size="32"
              style="margin-right: 4px"
              :prefix="false"
              src="/static/images/demo.jpeg" />
          </template>

          <template #rightIcon>
            <rl-button :onClick="viewHandle" size="small" type="link">
              预览
            </rl-button>
          </template>
        </rl-cell>
      </rl-section>

      <rl-section type="line" title="圆角">
        <rl-cell
          :border="false"
          radius="6"
          title="长标题---------------------------------------------"
          value="长内容---------------------------------------------" />
        <rl-gap height="12" />
        <rl-cell radius="6" title="标题" value="内容" />
      </rl-section>
    </rl-space>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";

const viewHandle = async () => {
  uni.previewImage({
    urls: ["/static/images/demo.jpeg"],
    current: 0,
  });
};
</script>

<style></style>
