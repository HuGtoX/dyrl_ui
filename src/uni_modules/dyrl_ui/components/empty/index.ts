import Empty from "./index.vue";

export default Empty;

declare module "vue" {
  export interface GlobalComponents {
    Empty: typeof Empty;
  }
}
