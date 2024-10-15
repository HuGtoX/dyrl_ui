import Switch from "./index.vue";

export default Switch;

declare module "vue" {
  export interface GlobalComponents {
    Switch: typeof Switch;
  }
}
