import Skeleton from "./index.vue";

export default Skeleton;

declare module "vue" {
  export interface GlobalComponents {
    Skeleton: typeof Skeleton;
  }
}
