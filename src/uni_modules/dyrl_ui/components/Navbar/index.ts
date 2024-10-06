import NavBar from "./index.vue";

export default NavBar;

declare module "vue" {
  export interface GlobalComponents {
    Navbar: typeof NavBar;
  }
}
