import ProUpload from "./index.vue";

export default ProUpload;

declare module "vue" {
  export interface GlobalComponents {
    ProUpload: typeof ProUpload;
  }
}
