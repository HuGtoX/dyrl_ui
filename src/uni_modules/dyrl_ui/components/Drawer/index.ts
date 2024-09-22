import Drawer from "./index.vue";

export default Drawer;

declare module "vue" {
  export interface GlobalComponents {
    Drawer: typeof Drawer;
  }
}
