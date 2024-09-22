import ProSelect from "./index.vue";

export default ProSelect;

declare module "vue" {
  export interface GlobalComponents {
    ProSelect: typeof ProSelect;
  }
}
