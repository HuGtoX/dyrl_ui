import Divider from "./index.vue";

export default Divider;

declare module "vue" {
  export interface GlobalComponents {
    Divider: typeof Divider;
  }
}
