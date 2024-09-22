import Gap from "./index.vue";

export default Gap;

declare module "vue" {
  export interface GlobalComponents {
    Gap: typeof Gap;
  }
}
