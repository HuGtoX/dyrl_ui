import TabItem from "./index.vue";

export default TabItem;

declare module "vue" {
  export interface GlobalComponents {
    TabItem: typeof TabItem;
  }
}
