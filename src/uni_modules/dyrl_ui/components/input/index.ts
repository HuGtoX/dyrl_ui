import Input from "./index.vue";

export default Input;

declare module "vue" {
  export interface GlobalComponents {
    Input: typeof Input;
  }
}
