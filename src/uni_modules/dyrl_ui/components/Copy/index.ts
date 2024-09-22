import Copy from "./index.vue";

export default Copy;

declare module "vue" {
  export interface GlobalComponents {
    Copy: typeof Copy;
  }
}
