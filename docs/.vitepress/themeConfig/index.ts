import { DefaultTheme } from "vitepress";

const documentItems = [
  { text: "微信SDK", link: "/others/wechat" },
  { text: "NFC识别", link: "/others/nfcScan" },
  { text: "vscode配置", link: "/others/vscode" },
  { text: "unoCSS", link: "/others/unoCSS" },
  { text: "chokidar", link: "/others/chokidar" },
  { text: "githubAction", link: "/others/githubAction" },
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
      text: "文档",
      activeMatch: "/others/",
      items: documentItems,
    },
  ],

  sidebar: {
    "/others": [
      {
        text: "文档",
        items: documentItems,
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
