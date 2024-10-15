import Icon from "./index.vue";

export default Icon;

declare module "vue" {
  export interface GlobalComponents {
    Icon: typeof Icon;
  }
}
