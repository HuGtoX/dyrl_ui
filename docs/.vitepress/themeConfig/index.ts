import { DefaultTheme } from "vitepress";

const extensionItems = [
  { text: "VSCode配置", link: "/note/extension/vscode" },
  { text: "WechatSDK", link: "/note/extension/wechat" },
  { text: "UniNFC", link: "/note/extension/nfcScan" },
  { text: "UnoCSS", link: "/note/extension/unoCSS" },
  { text: "Chokidar", link: "/note/extension/chokidar" },
  { text: "GithubAction", link: "/note/extension/githubAction" },
  { text: "WebExtension", link: "/note/extension/extension" },
];

const themeConfig: DefaultTheme.Config = {
  /* 右侧大纲配置 */
  outline: {
    level: "deep",
    label: "目录",
  },
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: "主页", link: "/" },
    { text: "组件", link: "/components/home" },
    { text: "导航", link: "/nav/" },
    {
      text: "个人文档",
      link: "/note/",
    },
  ],

  sidebar: {
    "/note": [
      {
        text: "拓展文档",
        items: extensionItems,
      },
      {
        text: "前端学习笔记",
        items: [
          { text: "HTML", link: "/note/frontEnd/html" },
          { text: "JavaScript", link: "/note/frontEnd/javascript" },
          { text: "面试题", link: "/note/frontEnd/interview" },
        ],
      },
    ],
    "/components": [
      {
        text: "开发指南",
        items: [
          { text: "介绍", link: "/components/home" },
          { text: "快速开始", link: "/components/quick" },
        ],
      },
      {
        text: "基础组件",
        items: [
          { text: "Button 按钮", link: "/components/button" },
          { text: "Card 卡片", link: "/components/card" },
          { text: "Cell 单元格", link: "/components/cell" },
          { text: "Icon 图标", link: "/components/icon" },
          { text: "Image 图片", link: "/components/image" },
        ],
      },
    ],
  },

  socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
};

export default themeConfig;
