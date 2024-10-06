<Frame />

## 基础用法

```vue
<rl-card title="标题"></rl-card>
```

## 其他用法

```vue
<rl-card
  :border="false"
  title="回看"
  subText="查看回看记录"
  extraText="1小时前"
  :footerText="dayjs().format('YYYY-MM-DD HH:mm:ss')"
  linkUrl="demo">
</rl-card>
```

## Attributes

| 参数    | 说明   | 类型             | 可选值                                      | 默认值  |
| ------- | ------ | ---------------- | ------------------------------------------- | ------- |
| size    | 尺寸   | string           | large / small / mini                        | default |
| type    | 类型   | string           | primary / success / warning / danger / text | default |
| block   | 类型   | string           | primary / success / warning / danger / text | default |
| loading | 加载中 | 'auto' / boolean | —                                           | false   |
