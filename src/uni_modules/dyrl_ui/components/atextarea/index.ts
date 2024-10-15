import Textarea from "./index.vue";

export default Textarea;

declare module "vue" {
  export interface GlobalComponents {
    Textarea: typeof Textarea;
  }
}
