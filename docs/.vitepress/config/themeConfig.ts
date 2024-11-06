import { DefaultTheme } from "vitepress";
import { extensionItems, frontEndItems } from "./note";
import componentItems from "./component";
import navItems from "./nav";

const themeConfig: DefaultTheme.Config = {
  search: {
    provider: "local",
  },

  /* 右侧大纲配置 */
  outline: {
    level: "deep",
    label: "目录",
  },
  // https://vitepress.dev/reference/default-theme-config
  nav: navItems,

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
