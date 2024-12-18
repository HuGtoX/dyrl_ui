# Github Actions自动化部署

::: info
[如何用Github Actions自动化部署到Github Pages](http://www.qianduan8.com/2072.html)
:::

## 当前文档Action示例

```yaml
name: Build and Deploy
# 监听 master 分支上的 push 事件
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    # 构建环境使用 ubuntu
    runs-on: ubuntu-latest
    steps:
      # 官方action, 将代码拉取到虚拟机
      - name: Checkout
        uses: actions/checkout@v3
        with:
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - uses: pnpm/action-setup@v4
        name: Install pnpm
        with:
          version: 9.11.0

      - name: Install dependencies
        run: pnpm install

      - name: Build Site
        run: pnpm build:deploy:docs

      # 部署
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        with:
          # 项目配置的打包目录名称
          folder: docs/.vitepress/dist
          # 提交分支名
          branch: docs-pages
```
