<Frame />

## 基础用法

```vue
<rl-cell label="副标题" title="标题" value="内容" />
<rl-cell center label="副标题" title="标题" value="内容居中" />
```

## Clickable

```vue
<rl-cell clickable title="点击反馈" value="内容" arrow />
<rl-cell center icon="share" clickable title="点击反馈" value="内容" arrow />
```

## 插槽

```vue
<rl-cell title="文件名" center>
    <template #prefix>
    <rl-image
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
```

## 圆角

```vue
<rl-cell
  :border="false"
  radius="6"
  title="长标题---------------------------------------------"
  value="长内容---------------------------------------------"></rl-cell>
<rl-cell radius="6" title="标题" value="内容" />
```

## Attributes

| 参数    | 说明   | 类型             | 可选值                                      | 默认值  |
| ------- | ------ | ---------------- | ------------------------------------------- | ------- |
| size    | 尺寸   | string           | large / small / mini                        | default |
| type    | 类型   | string           | primary / success / warning / danger / text | default |
| block   | 类型   | string           | primary / success / warning / danger / text | default |
| loading | 加载中 | 'auto' / boolean | —                                           | false   |
