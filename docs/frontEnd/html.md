# HTML 部分

## 1. src和href的区别

### 用途不同

- src（source）用于指定嵌入到html文档的外部资源，如音视频、图片和JavaScript文件等。
- href（hypetext reference）用于指定链接到html文档之外的资源，如css样式文件、字体文件或其他网页。

### 引入方式不同

- src属性引入的资源是必需的，并且将在文档中占据一定的空间，可能影响文档的渲染。
- href属性引用的资源是可选的，并且不会占据文档的空间，仅用于指定链接到文档之外的资源。

### 对文档的影响不同

- src属性引用的资源是直接嵌入到文档中的，因此会影响文档的加载和呈现。
- href是通过链接到外部资源来影响文档的样式和行为，只会影响到该资源的使用，而不会影响到整个文档的加载和显示。

## 2. script标签中的defer和async的区别

defer和async都是异步去加载外部的js脚本文件，不会阻塞页面其他部分的解析。

### 区别

- 执行顺序：多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照顺序执行
- 执行周期：带async属性的标签与文档其他部分是并行加载和执行的，即异步执行。defer属性则是与文档其他部分并行加载，js脚本需要在文档所有元素解析完成之后才执行，即DOMContentLoaded事件触发之前执行。

## 3. meta标签

meta 标签由 name 和 content 属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些name作为大家使用的共识，开发者还可以自定义name。

- refresh，页面重定向和刷新

```html
<meta http-equiv="refresh" content="0;url=" />
```

- viewport，适配移动端，可以控制视口的大小和比例：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1" />
```

## 4. Web存储（缓存）

主要指在web通信过程中将一些常用数据保存在客户端（本地），通常用于保存用户的token信息以保持登录状态，或是一些交互数据以保证用户在下次浏览时有良好的交互体验。

### 存储方式

1. cookie

- cookie的大小不能超过4KB
- cookie默认会在会话结束时失效，也可以手动修改max-age或Expires参数来设置cookie的失效时间，前者是规定cookie在多少秒后失效，而后者则是规定cookie在某个时间点失效。如果同时设置了这两个参数，则max-age优先级更高。

2. localStorage

- 用于保存长期数据，没有过期时间，需要手动删除才能将本地存储的数据移除。
- 一般来说，Local Storage 的容量大约为 5-10 MB，具体取决于浏览器的实现。

3. sessionStorage

- 用于在一个浏览器标签中存储数据，数据在窗标签或窗口关闭时被清空。
- 与 Local Storage 类似，Session Storage 常常提供 5-10 MB 的存储空间。

4. indexedDB
