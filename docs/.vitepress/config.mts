import { defineConfig } from "vitepress";
import {
  demoblockPlugin,
  demoblockVitePlugin,
} from "vitepress-theme-demoblock";
import AutoImport from "unplugin-auto-import/vite";
import themeConfig from "./config/themeConfig";
import path from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gixy's Blog",
  description: "组件库文档及个人笔记",
  lang: "zh-CN",
  base: "/dyrl_ui/",
  srcDir: "src",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/dyrl_ui/logo.png" }]],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern", "legacy"
          silenceDeprecations: ["legacy-js-api"],
          importers: [],
        },
      },
    },
    plugins: [
      demoblockVitePlugin(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
        ],
        imports: ["vue"],
        dts: "typings/auto-imports.d.ts",
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@root",
          replacement: path.resolve(__dirname, "../"),
        },
        {
          find: "@alias",
          replacement: path.resolve(__dirname, "../../"),
        },
      ],
    },
  },
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: "demoblock-custom",
      });
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "参考",
      detailsLabel: "详细信息",
    },
  },

  themeConfig: themeConfig,
});
