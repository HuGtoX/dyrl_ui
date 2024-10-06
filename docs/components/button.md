<Frame />

## 基础用法

```vue
<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="text">文字按钮</Button>
<Button type="link">链接按钮</Button>
```

## 块级按钮

```vue
<Button block type="primary">block</Button>
```

## 按钮形状

```vue
<Button type="success">round</Button>
<Button shape="square" type="primary">square</Button>
```

## 图标按钮

```vue
<Button icon="time" type="success">round</Button>
<Button icon="download" shape="square" type="primary">square</Button>
```

## 加载状态

```vue
<script setup>
const handleClick = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};
</script>

<template>
  <Space size="8">
    <Button :loading="true" type="primary">基本loading</Button>
    <Button :onClick="handleClick" type="primary"> 异步加载loading </Button>
  </Space>
</template>
```

## Attributes

| 参数    | 说明   | 类型             | 可选值                                      | 默认值  |
| ------- | ------ | ---------------- | ------------------------------------------- | ------- |
| size    | 尺寸   | string           | large / small / mini                        | default |
| type    | 类型   | string           | primary / success / warning / danger / text | default |
| block   | 类型   | string           | primary / success / warning / danger / text | default |
| loading | 加载中 | 'auto' / boolean | —                                           | false   |
