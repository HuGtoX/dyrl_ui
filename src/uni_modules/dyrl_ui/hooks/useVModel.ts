export interface UseVModelOptions<T, Passive extends boolean = false> {
  /**
   * When passive is set to `true`, it will use `watch` to sync with props and ref.
   * Instead of relying on the `v-model` or `.sync` to work.
   *
   * @default false
   */
  passive?: Passive;
  /**
   * When eventName is set, it's value will be used to overwrite the emit event name.
   *
   * @default undefined
   */
  eventName?: string;
  /**
   * Attempting to check for changes of properties in a deeply nested object or array.
   * Apply only when `passive` option is set to `true`
   *
   * @default false
   */
  deep?: boolean;
  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T;

  /**
   * The hook before triggering the emit event can be used for form validation.
   * if false is returned, the emit event will not be triggered.
   *
   * @default undefined
   */
  shouldEmit?: (v: T) => boolean;
}

import { computed, getCurrentInstance } from "vue";
const isDef = <T = any>(val?: T): val is T => typeof val !== "undefined";
export function useVModel<
  P extends object,
  K extends keyof P,
  Name extends string,
  Passive extends boolean
>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options: UseVModelOptions<P[K], Passive> = {}
) {
  const { eventName, defaultValue } = options;

  const vm = getCurrentInstance();
  // @ts-expect-error mis-alignment with @vue/composition-api
  const _emit =
    emit ||
    vm?.emit ||
    vm?.$emit?.bind(vm) ||
    vm?.proxy?.$emit?.bind(vm?.proxy);
  let event: string | undefined = eventName;

  if (!key) {
    key = "modelValue" as K;
  }

  event = event || `update:${key!.toString()}`;

  const getValue = () => (isDef(props[key!]) ? props[key!] : defaultValue);

  const triggerEmit = (value: P[K]) => {
    _emit(event, value);
  };

  return computed<P[K]>({
    get() {
      return getValue()!;
    },
    set(value) {
      triggerEmit(value);
    },
  });
}
