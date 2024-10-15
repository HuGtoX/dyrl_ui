import Radio from "./index.vue";

export default Radio;

declare module "vue" {
  export interface GlobalComponents {
    Radio: typeof Radio;
  }
}
