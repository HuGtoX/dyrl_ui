import CheckBox from "./index.vue";

export default CheckBox;

declare module "vue" {
  export interface GlobalComponents {
    CheckBox: typeof CheckBox;
  }
}
