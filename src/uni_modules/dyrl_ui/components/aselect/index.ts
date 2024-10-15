import Select from "./index.vue";

export default Select;

declare module "vue" {
  export interface GlobalComponents {
    Select: typeof Select;
  }
}
