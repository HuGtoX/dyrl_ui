import Popup from "./index.vue";

export default Popup;

declare module "vue" {
  export interface GlobalComponents {
    Popup: typeof Popup;
  }
}
