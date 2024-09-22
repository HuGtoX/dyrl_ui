import SafeArea from "./index.vue";

export default SafeArea;

declare module "vue" {
  export interface GlobalComponents {
    SafeArea: typeof SafeArea;
  }
}
