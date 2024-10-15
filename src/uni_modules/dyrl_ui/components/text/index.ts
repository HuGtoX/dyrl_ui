import Text from "./index.vue";

export default Text;

declare module "vue" {
  export interface GlobalComponents {
    Text: typeof Text;
  }
}
