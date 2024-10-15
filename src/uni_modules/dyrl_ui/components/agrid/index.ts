import Grid from "./index.vue";

export default Grid;

declare module "vue" {
  export interface GlobalComponents {
    Grid: typeof Grid;
  }
}
