import Modal from "./index.vue";

export default Modal;

declare module "vue" {
  export interface GlobalComponents {
    Modal: typeof Modal;
  }
}
