import Space from "./index.vue";

export default Space;

declare module "vue" {
  export interface GlobalComponents {
    Space: typeof Space;
  }
}
