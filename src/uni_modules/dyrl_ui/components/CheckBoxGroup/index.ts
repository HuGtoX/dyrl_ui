import type { InjectionKey } from "vue";
import { createNamespace } from "../utils";

const [name] = createNamespace("checkbox-group");
export type CheckboxGroupProvide = {
  props: any;
  updateValue: (value: unknown[]) => void;
};
export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupProvide> =
  Symbol(name);
