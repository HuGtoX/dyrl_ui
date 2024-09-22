import Cell from "./index.vue";

export default Cell;

declare module "vue" {
  export interface GlobalComponents {
    Cell: typeof Cell;
  }
}
