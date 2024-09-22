import Swiper from "./index.vue";

export default Swiper;

declare module "vue" {
  export interface GlobalComponents {
    Swiper: typeof Swiper;
  }
}
