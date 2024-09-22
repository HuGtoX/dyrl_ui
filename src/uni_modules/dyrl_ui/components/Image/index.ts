import Image from "./index.vue";

export default Image;

declare module "vue" {
  export interface GlobalComponents {
    Image: typeof Image;
  }
}
