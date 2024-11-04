import { DefaultTheme } from "vitepress";
import { extensionItems, frontEndItems } from "./note";
import componentItems from "./component";

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
        collapsed: false,
        items: extensionItems,
      },
      {
        text: "前端笔记",
        collapsed: true,
        items: frontEndItems,
      },
    ],
    "/components": componentItems,
  },

  socialLinks: [{ icon: "github", link: "https://github.com/HuGtoX" }],
};

export default themeConfig;
