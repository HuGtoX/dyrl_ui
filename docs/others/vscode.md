# VSCode 插件及配置

## 项目配置

1. 配置文件：`.vscode/settings.json`

```json
 // 控制相关文件嵌套展示
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "*.ts": "$(capture).test.ts, $(capture).test.tsx",
    "*.tsx": "$(capture).test.ts, $(capture).test.tsx",
    // "*.env": "$(capture).env.*",
    "CHANGELOG.md": "CHANGELOG*",
    ".env.dev": ".env.dev,.env.prod,.env.test",
    "project.config.json": "postcss.config.js,project.tt.json,jest.config.ts,babel.config.js,.stylelintrc.js,.eslintrc.js,tailwind.config.js,.prettierrc,.prettierignore,openapi.config.ts",
    "package.json": "pnpm-lock.yaml,pnpm-workspace.yaml,LICENSE,.gitattributes,.gitignore,.gitpod.yml,CNAME,.npmrc,.browserslistrc",
    ".eslintrc.cjs": ".eslintignore,.prettierignore,.stylelintignore,.commitlintrc.*,.prettierrc.*,.stylelintrc.*,.eslintrc-auto-import.json,.editorconfig,.commitlint.cjs"
  }
```
