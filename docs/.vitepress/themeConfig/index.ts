import { DefaultTheme } from "vitepress";

const documentItems = [
  { text: "微信SDK", link: "/others/wx" },
  { text: "NFC识别", link: "/others/nfc" },
  { text: "VSCode配置", link: "/others/vscode" },
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
        text: "组件",
        items: [{ text: "Button", link: "/components/button" }],
      },
    ],
  },

  socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
};

export default themeConfig;
