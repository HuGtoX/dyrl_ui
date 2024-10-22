<Frame />

<script setup>
import { ElTable,ElTableColumn } from 'element-plus'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

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

  <el-table :data="tableData" >
    <el-table-column prop="date" label="参数" width="180" />
    <el-table-column prop="name" label="说明" width="180" />
    <el-table-column prop="date" label="类型" />
    <el-table-column prop="name" label="默认值" />
  </el-table>
