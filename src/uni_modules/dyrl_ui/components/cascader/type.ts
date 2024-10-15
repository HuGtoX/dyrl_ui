export type DataTree = {
  text?: string;
  value?: string | number;
  color?: string;
  disabled?: boolean;
  children?: CascaderOption[];
  className?: unknown;
  // for custom field names
  [key: PropertyKey]: any;
};

export type CascaderTab = {
  options: CascaderOption[];
  selected: CascaderOption | null;
};

export type SelectedOptions = {
  value: string | number;
  tabIndex: number;
  selectedOptions: CascaderOption[];
};

export type CascaderOption = {
  text?: string;
  value?: string | number;
  color?: string;
  disabled?: boolean;
  children?: CascaderOption[];
  className?: unknown;
  // for custom field names
  [key: PropertyKey]: any;
};
