import List from "./index.vue";

export default List;

declare module "vue" {
  export interface GlobalComponents {
    List: typeof List;
  }
}
