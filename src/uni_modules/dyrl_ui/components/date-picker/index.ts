import DatePicker from "./index.vue";

export default DatePicker;

declare module "vue" {
  export interface GlobalComponents {
    DatePicker: typeof DatePicker;
  }
}
