# 📱 rl-uniapp-components

## Features

🍭 Support Vue 3  
🍭 Support APP、小程序、H5

## 组件样式透传

兼容微信小程序、H5、APP的写法

apply-shared表示只受外界样式的影响但是自身的样式不会去影响其他组件的样式
shared会将自己写的样式影响其他组件
因为当前组件都带有固定前缀，只要不与前缀重复则不会造成样式冲突，所以默认使用shared

```js
/* Demo.vue */
<template>
	<view class="demo"></view>
</template>
<script lang="ts">
export default {
  name: "demo",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
	.demo {
        --rl-demo-color: #fff;
		color: var(--rl-demo-color);
	}
</style>
```

```js
<template>
    <view class='wrapper'>
        <Demo></Demo>
    </view>
</template>
<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
};
</script>
<style lang="scss" scoped>
.wrapper{
    :deep(.demo){
        --rl-demo-color: #000;
    }
}
</style>
```

### Loading

## 表单组件

### FormItem

### Input

### Textarea

### Checkbox

### Radio

### Switch

### DatePicker

### Uploader

### Select

###
