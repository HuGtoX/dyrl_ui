import Line from "./index.vue";

export default Line;

declare module "vue" {
  export interface GlobalComponents {
    Line: typeof Line;
  }
}
