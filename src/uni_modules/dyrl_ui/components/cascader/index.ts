import Cascader from "./index.vue";

export default Cascader;

declare module "vue" {
  export interface GlobalComponents {
    Cascader: typeof Cascader;
  }
}
