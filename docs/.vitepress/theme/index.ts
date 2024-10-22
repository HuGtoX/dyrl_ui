// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { useComponents } from "./useComponents";
import "./style.css";
import "vitepress-theme-demoblock/dist/theme/styles/index.css";
import Layout from "./components/Layout.vue";
import NavLinks from "./components/NavLinks.vue";
import Frame from "./components/Frame.vue";
import "element-plus/dist/index.css";
import "./overide.scss";

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();
    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }
    return h(Layout, props, {});
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component("MNavLinks", NavLinks);
    ctx.app.component("Frame", Frame);
    useComponents(ctx.app);
  },
} satisfies Theme;
