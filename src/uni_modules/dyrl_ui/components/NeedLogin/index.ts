import NeedLogin from "./index.vue";

export default NeedLogin;

declare module "vue" {
  export interface GlobalComponents {
    NeedLogin: typeof NeedLogin;
  }
}
