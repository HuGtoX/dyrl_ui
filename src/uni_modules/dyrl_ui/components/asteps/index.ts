import type { InjectionKey } from "vue";
import { createNamespace } from "../utils";

const [name] = createNamespace("steps");
export type StepsProvide = {
  props: any;
};
export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol(name);
