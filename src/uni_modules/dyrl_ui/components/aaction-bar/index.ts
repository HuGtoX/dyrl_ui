import ActionBar from "./index.vue";

export default ActionBar;

declare module "vue" {
  export interface GlobalComponents {
    ActionBar: typeof ActionBar;
  }
}
