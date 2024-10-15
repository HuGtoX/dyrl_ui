import Card from "./index.vue";

export default Card;

type Numeric = string | number;
type CardProps = {
  title?: string;
  color?: string;
  bgColor?: string;
  spacing?: Numeric | Numeric[];
  extraText?: string;
  subText?: string;
  thumbnail?: string;
  thumbnailSize?: number | "large" | "middle" | "small";
  thumbnailRadius?: Numeric;
  icon?: string;
  iconSize?: Numeric;
  iconBackground?: string;
  footerText?: string;
  footerExtraText?: string;
  linkUrl?: string;
  customStyle?: any;
  href?: string;
  line?: number;
  shadow?: boolean;
};

declare module "vue" {
  export interface GlobalComponents {
    Card: typeof Card;
  }
}
