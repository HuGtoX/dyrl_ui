import { createSSRApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import "@/uni_modules/dyrl_ui/components/style/index.scss";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}