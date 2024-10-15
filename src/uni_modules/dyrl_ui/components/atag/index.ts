import Tag from "./index.vue";

export default Tag;

declare module "vue" {
  export interface GlobalComponents {
    Tag: typeof Tag;
  }
}
