<template>
  <Layout>
    <rl-space direction="vertical" size="12">
      <rl-section type="line" title="基础用法">
        <rl-grid>
          <rl-grid-item span="8" v-for="item in 3" :key="item">
            <div class="flex justify-center bg-cyan text-white py-2">
              span: 8
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>

      <rl-section type="line" title="列数">
        <rl-grid columns="4" gap="8">
          <rl-grid-item v-for="item in 4" :key="item">
            <div class="flex justify-center bg-cyan text-white py-2">
              columns: 4
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>

      <rl-section type="line" title="列间距">
        <rl-grid gap="12">
          <rl-grid-item span="8" v-for="item in 3" :key="item">
            <div class="flex justify-center bg-cyan text-white py-2">
              gap: 12
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>

      <rl-section type="line" title="垂直间距">
        <rl-grid :gap="[6, 12]">
          <rl-grid-item span="12" v-for="item in 3" :key="item">
            <div class="flex justify-center bg-cyan text-white py-2">
              span:12 / gap: 12
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>
    </rl-space>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
</script>

<style></style>
