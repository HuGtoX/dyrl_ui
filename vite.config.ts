import AutoImport from "unplugin-auto-import/vite";
import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig, loadEnv } from "vite";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern", "legacy"
          silenceDeprecations: ["legacy-js-api"],
          importers: [],
        },
      },
    },
    root: mode === "development" ? "/" : "/dyrl_ui/demo/",
    server: {
      port: Number(env.PORT) || 9000,
    },
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
  };
});
