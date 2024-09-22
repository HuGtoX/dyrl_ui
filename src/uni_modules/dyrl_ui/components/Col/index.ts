import Col from "./index.vue";

export default Col;

declare module "vue" {
  export interface GlobalComponents {
    Col: typeof Col;
  }
}
