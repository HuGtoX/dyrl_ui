import ListView from "./index.vue";

export default ListView;

declare module "vue" {
  export interface GlobalComponents {
    ListView: typeof ListView;
  }
}
