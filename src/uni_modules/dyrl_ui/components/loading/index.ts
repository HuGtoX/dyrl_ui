import Loading from "./index.vue";

export default Loading;

declare module "vue" {
  export interface GlobalComponents {
    Loading: typeof Loading;
  }
}
