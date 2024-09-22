import ListItem from "./index.vue";

export default ListItem;

declare module "vue" {
  export interface GlobalComponents {
    ListItem: typeof ListItem;
  }
}
