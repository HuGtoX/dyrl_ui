<template>
  <Layout>
    <rl-section type="line" title="基础用法">
      <rl-space>
        <rl-button v-for="item in 4" :key="item" shape="square" type="primary">
          按钮
        </rl-button>
      </rl-space>
    </rl-section>

    <rl-section type="line" title="垂直排列">
      <rl-space fill direction="vertical">
        <rl-button v-for="item in 3" :key="item" shape="square" type="primary">
          按钮
        </rl-button>
      </rl-space>
    </rl-section>

    <rl-section type="line" title="自定义间距">
      <rl-space size="12" direction="vertical">
        <rl-space size="12">
          <rl-button
            v-for="item in 4"
            :key="item"
            shape="square"
            type="primary">
            按钮
          </rl-button>
        </rl-space>
        <rl-space size="20">
          <rl-button
            v-for="item in 3"
            :key="item"
            shape="square"
            type="primary">
            按钮
          </rl-button>
        </rl-space>
      </rl-space>
    </rl-section>

    <rl-section type="line" title="对齐方式">
      <rl-radio-group direction="horizontal" v-model="align">
        <rl-space>
          <rl-radio name="start">start</rl-radio>
          <rl-radio name="center">center</rl-radio>
          <rl-radio name="end">end</rl-radio>
          <rl-radio name="baseline">baseline</rl-radio>
        </rl-space>
      </rl-radio-group>

      <div class="bg-[#fff] p-10px mt-2">
        <rl-space :align="align">
          <rl-button shape="square" size="small" type="primary">
            按钮
          </rl-button>
          <div
            class="h-60px w-60px bg-[#F3F2F5] flex justify-center items-center">
            block
          </div>
        </rl-space>
      </div>
    </rl-section>

    <rl-section type="line" title="自动换行">
      <rl-space wrap>
        <rl-button v-for="item in 8" :key="item" shape="square" type="primary">
          按钮
        </rl-button>
      </rl-space>
    </rl-section>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from "@/components/Layout.vue";
const align = ref("start");
</script>

<style lang="scss" scoped></style>
