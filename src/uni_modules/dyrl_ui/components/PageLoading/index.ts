import PageLoading from "./index.vue";

export default PageLoading;

declare module "vue" {
  export interface GlobalComponents {
    PageLoading: typeof PageLoading;
  }
}
