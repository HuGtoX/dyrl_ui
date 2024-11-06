# 组件库文档开发记录

在Bash中，可以使用 && 运算符来连接多个命令，确保前一个命令成功执行后才执行下一个命令。
例如： ls -l && echo "Hello, world!" && mkdir test

因为改组件库文档的demo需要借助ifram引入组件实例，并且在文档中需要通过环境来区分ifram要引用的地址，因此在生产环境中我们需要将打包后的组件通过命令行拷贝到部署文档所在的目录中，并设置好静态资源路径。这时候就需要在命令行中执行多个操作，以确保组件是最新的打包文件并拷贝到文档目录中。
所以我们需要再package.json中添加一个脚本，用来执行这些操作。

1. pnpm run build
2. pnpm build:docs
3. cp -r dist/build/h5 docs/.vitepress/dist

最终的写法是：

```json
{
  "scripts": {
    "build:github:docs": "pnpm build && pnpm build:docs && node build/demoCopy.js"
  }
}
```
