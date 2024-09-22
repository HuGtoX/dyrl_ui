import Avatar from "./index.vue";

export default Avatar;

declare module "vue" {
  export interface GlobalComponents {
    Avatar: typeof Avatar;
  }
}
