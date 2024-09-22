<script setup>
</script>

## 基础用法

:::demo

```vue
<template>
  <Space direction="vertical" size="12">
    <Section type="line" title="按钮类型">
      <Space wrap size="8">
        <Button>默认按钮</Button>
        <Button type="primary">主要按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button type="text">文字按钮</Button>
        <Button type="link">链接按钮</Button>
      </Space>
    </Section>

    <Section type="line" title="块级按钮">
      <Button block type="primary">block</Button>
    </Section>

    <Section type="line" title="按钮形状">
      <Space size="8">
        <Button type="success">round</Button>
        <Button shape="square" type="primary">square</Button>
      </Space>
    </Section>

    <Section type="line" title="图标按钮(内置Icon组件)">
      <Space size="8">
        <Button icon="time" type="success">round</Button>
        <Button icon="download" shape="square" type="primary">square</Button>
      </Space>
    </Section>
  </Space>
</template>
```

:::

## 加载状态

:::demo

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

:::

## Attributes

| 参数    | 说明   | 类型             | 可选值                                      | 默认值  |
| ------- | ------ | ---------------- | ------------------------------------------- | ------- |
| size    | 尺寸   | string           | large / small / mini                        | default |
| type    | 类型   | string           | primary / success / warning / danger / text | default |
| block   | 类型   | string           | primary / success / warning / danger / text | default |
| loading | 加载中 | 'auto' / boolean | —                                           | false   |
