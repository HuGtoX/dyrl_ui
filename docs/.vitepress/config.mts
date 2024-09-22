import { defineConfig } from "vitepress";
// import {
//   demoblockPlugin,
//   demoblockVitePlugin,
// } from "vitepress-theme-demoblock";
import AutoImport from "unplugin-auto-import/vite";
import themeConfig from "./themeConfig";
import path from "path";

console.log("-- [ __dirname ] --", path.resolve(__dirname, "../../"));
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@dyrl/mobile",
  description: "A Company UI Package ",
  lang: "zh-CN",
  vite: {
    plugins: [
      // demoblockVitePlugin(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ["vue"],
        dts: "typings/auto-imports.d.ts",
      }),
    ],
    resolve: {
      alias: {
        "@root": path.resolve(__dirname, "../../"),
        "@alias": path.resolve(__dirname, "../"),
      },
    },
  },
  markdown: {
    // config: (md) => {
    //   md.use(demoblockPlugin, {
    //     customClass: "demoblock-custom",
    //   });
    // },
  },
  themeConfig: themeConfig,
});
