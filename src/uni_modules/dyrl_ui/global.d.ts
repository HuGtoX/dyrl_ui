declare module "vue" {
  // Helper for Volar
  export interface GlobalComponents {
    RlButton: (typeof import("./components/Button/index"))["default"];
    RlCell: (typeof import("./components/Cell/index"))["default"];
    RlImage: (typeof import("./components/Image/index"))["default"];
    RlIcon: (typeof import("./components/Icon/index"))["default"];
    RlCard: (typeof import("./components/Card/index"))["default"];
    RlSection: (typeof import("./components/Section/index"))["default"];
    RlSpace: (typeof import("./components/Space/index"))["default"];
    RlGrid: (typeof import("./components/Grid/index"))["default"];
    RlGridItem: (typeof import("./components/GridItem/index"))["default"];
    RlText: (typeof import("./components/Text/index"))["default"];
    RlGap: (typeof import("./components/Gap/index"))["default"];
    RlPopup: (typeof import("./components/Popup/index"))["default"];
    RLNavbar: (typeof import("./components/Navbar/index"))["default"];
    RLRadioGroup: (typeof import("./components/Radio-Group/index"))["default"];
    RLRadio: (typeof import("./components/Radio/index"))["default"];
  }
}

export {};
