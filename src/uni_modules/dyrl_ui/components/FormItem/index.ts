import { createNamespace } from "../utils";
import FormItem from "./index.vue";

const [name] = createNamespace("form-item");

export type FromItemProvide = {
  props: any;
};
export const FORM_ITEM_KEY: InjectionKey<FromItemProvide> = Symbol(name);

declare module "vue" {
  export interface GlobalComponents {
    FormItem: typeof FormItem;
  }
}
