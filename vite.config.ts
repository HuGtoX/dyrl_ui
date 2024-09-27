import AutoImport from "unplugin-auto-import/vite";
import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    UnoCSS(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ["vue", "uni-app"],
      dts: "typings/auto-imports.d.ts",
    }),
  ],

  // build: {
  //   sourcemap: false,
  // },
});
