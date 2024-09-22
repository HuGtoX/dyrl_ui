import type { InjectionKey } from "vue";
import { createNamespace } from "../utils";

const [name] = createNamespace("radio-group");
export type RadioGroupProvide = {
  props: any;
  updateValue: (value: unknown[]) => void;
};
export const RADIO_GROUP_KEY: InjectionKey<RadioGroupProvide> = Symbol(name);
