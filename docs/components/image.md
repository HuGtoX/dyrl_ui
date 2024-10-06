<Frame />

## 基础用法

```vue
<rl-image src="/static/images/demo.jpeg" size="70" />
```

## 填充模式

```vue
<script setup lang="ts">
import Layout from "@/components/Layout.vue";
const mode = ["aspectFill", "aspectFit", "scaleToFill", "widthFix"] as const;
</script>
<template>
  <rl-image
    class="bg-gray"
    :mode="item"
    src="/static/images/demo.jpeg"
    size="70" />
</template>
```

## 填充模式

```vue
<script setup lang="ts">
import Layout from "@/components/Layout.vue";
const mode = ["aspectFill", "aspectFit", "scaleToFill", "widthFix"] as const;
</script>
<template>
  <rl-image
    class="bg-gray"
    src="/static/images/demo.jpeg"
    :mode="item"
    size="70"
    round />
</template>
```

## 加载失败提示

```vue
<rl-image errIcon src="/" size="100" />
<rl-image src="/" size="100" />
```

## Attributes
