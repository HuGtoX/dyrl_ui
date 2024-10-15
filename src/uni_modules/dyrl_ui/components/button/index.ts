import Button from "./index.vue";

export default Button;

declare module "vue" {
  export interface GlobalComponents {
    Button: typeof Button;
  }
}
