import Section from "./index.vue";

export default Section;

declare module "vue" {
  export interface GlobalComponents {
    Section: typeof Section;
  }
}
