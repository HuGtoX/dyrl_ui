import Search from "./index.vue";

export default Search;

declare module "vue" {
  export interface GlobalComponents {
    Search: typeof Search;
  }
}
