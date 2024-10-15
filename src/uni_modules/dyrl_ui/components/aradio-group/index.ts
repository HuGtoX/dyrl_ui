import type { InjectionKey } from "vue";
import { createNamespace } from "../utils";
import RadioGroup from "./index.vue";

const [name] = createNamespace("radio-group");
type RadioGroupProvide = {
  props: any;
  updateValue: (value: unknown[]) => void;
};
export const RADIO_GROUP_KEY: InjectionKey<RadioGroupProvide> = Symbol(name);

declare module "vue" {
  export interface GlobalComponents {
    RadioGroup: typeof RadioGroup;
  }
}
