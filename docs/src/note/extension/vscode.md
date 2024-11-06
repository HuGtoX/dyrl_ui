# VSCode 常用配置及插件

## 常用插件

```json
{
  "recommendations": [
    "vue.volar", // Volar
    "stylelint.vscode-stylelint", // Stylelint
    "esbenp.prettier-vscode", // prettier
    "dbaeumer.vscode-eslint", // ESLint
    "antfu.unocss", // UnoCSS
    "MS-CEINTL.vscode-language-pack-zh-hans", // vscode 中文（简体）语言包
    "mhutchie.git-graph", // git 提交记录
    "donjayamanne.githistory", // git 历史记录
    "Alibaba-Cloud.tongyi-lingma", // 通义灵码
    "streetsidesoftware.code-spell-checker" // 单词拼写检查
  ]
}
```

## 项目配置

配置文件：`.vscode/settings.json`

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

## 代码片段

VS Code 提供了不少内置变量,可以在代码片段中使用。这些变量会在插入片段时被实际值替换。

常用内置变量:

- $TM_FILENAME: 当前文件的文件名
- $TM_FILENAME_BASE: 当前文件的文件名(不含扩展名)
- $TM_DIRECTORY: 当前文件所在的目录
- $TM_FILEPATH: 当前文件的完整文件路径
- $CLIPBOARD: 当前剪贴板中的内容

### console.log 代码片段

自动填入剪切板的内容

```json
{
  "console log": {
    "prefix": "cls",
    "body": ["console.log('--- $1${CLIPBOARD} ---', ${CLIPBOARD})"],
    "description": "Log output to console"
  }
}
```
