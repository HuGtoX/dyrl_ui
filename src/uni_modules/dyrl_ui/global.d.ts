declare module "vue" {
  // Helper for Volar
  export interface GlobalComponents {
    RlButton: (typeof import("./components/button/index"))["default"];
    RlCell: (typeof import("./components/cell/index"))["default"];
    RlImage: (typeof import("./components/image/index"))["default"];
    RlIcon: (typeof import("./components/icon/index"))["default"];
    RlCard: (typeof import("./components/card/index"))["default"];
    RlSection: (typeof import("./components/section/index"))["default"];
    RlSpace: (typeof import("./components/space/index"))["default"];
    RlGrid: (typeof import("./components/grid/index"))["default"];
    RlGridItem: (typeof import("./components/grid-item/index"))["default"];
    RlText: (typeof import("./components/text/index"))["default"];
    RlGap: (typeof import("./components/gap/index"))["default"];
    RlPopup: (typeof import("./components/popup/index"))["default"];
    RLNavbar: (typeof import("./components/navbar/index"))["default"];
    RLRadioGroup: (typeof import("./components/radio-group/index"))["default"];
    RLRadio: (typeof import("./components/radio/index"))["default"];
  }
}

export {};
