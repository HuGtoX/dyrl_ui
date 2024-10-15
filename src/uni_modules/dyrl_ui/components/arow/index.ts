import type { InjectionKey } from "vue";
import { createNamespace } from "../utils";

const [name] = createNamespace("row");
export type RowPropsProvide = {
  props: any;
};
export const ROW_KEY: InjectionKey<RowPropsProvide> = Symbol(name);
