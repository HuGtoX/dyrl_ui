import { nextTick, ref, watch, type InjectionKey, type Ref } from "vue";
import { getRect, sleep } from "../utils";

export type TabsProvide = {
  props: any;
};
export const TABS_KEY: InjectionKey<TabsProvide> = Symbol("rl-tabs");

export const useTabs = (list: Ref<any>, lineWidth: Ref<any>, instance: any) => {
  const lineOffsetLeft = ref(0);
  const innerCurrent = ref(0);
  const cardOffsetLeft = ref(0);
  const tabsItemWidth = ref(0);
  const scrollViewWidth = ref(0);
  const firstTime = ref(false);
  const scrollLeft = ref();
  const tabsRect = ref<any>({
    left: 0,
  });

  watch(list, () => {
    nextTick(() => resize());
  });

  const setScrollLeft = () => {
    // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
    const tabRect = list.value[innerCurrent.value];

    // 累加得到当前item到左边的距离
    const offsetLeft = list.value
      .slice(0, innerCurrent.value)
      .reduce((total: number, curr: any) => {
        return total + curr.rect.width;
      }, 0);
    // 此处为屏幕宽度
    const windowWidth = uni.getSystemInfoSync().windowWidth;

    // console.log("offsetLeft", offsetLeft);
    tabsItemWidth.value = tabRect.rect.width;

    // console.log("tabsRect.value.left", tabsRect.value.left);

    // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
    let innerScrollLeft =
      offsetLeft -
      (tabsRect.value.width - tabRect.rect.width) / 2 -
      (windowWidth - tabsRect.value.right) / 2 +
      tabsRect.value.left / 2;
    // 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
    innerScrollLeft = Math.min(
      innerScrollLeft,
      scrollViewWidth.value - tabsRect.value.width,
    );

    scrollLeft.value = Math.max(0, innerScrollLeft);
  };

  // 获取导航菜单的尺寸
  const getTabsRect = () => {
    return new Promise((resolve) => {
      queryRect("rl-tabs__wrapper__scroll-view").then((size) => resolve(size));
    });
  };
  // 获取所有标签的尺寸
  const getAllItemRect = () => {
    return new Promise((resolve) => {
      const promiseAllArr = list.value.map((item, index: number) =>
        queryRect(`rl-tabs__nav__item-${index}`),
      );
      Promise.all(promiseAllArr).then((sizes) => resolve(sizes));
    });
  };

  const setLineLeft = () => {
    const tabItem = list.value[innerCurrent.value];
    if (!tabItem) {
      return;
    }

    // 获取滑块该移动的位置
    const innerLineOffsetLeft = list.value
      .slice(0, innerCurrent.value)
      .reduce((total: number, curr: any) => total + curr.rect.width, 0);
    // 获取下划线的数值px表示法

    const innerLineWidth = Number(lineWidth.value);

    // line位移距离
    lineOffsetLeft.value =
      innerLineOffsetLeft + (tabItem.rect.width - innerLineWidth) / 2;

    // 卡片位移距离
    cardOffsetLeft.value = innerLineOffsetLeft;

    // 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
    if (firstTime.value) {
      setTimeout(() => {
        firstTime.value = false;
      }, 20);
    }
  };

  // 获取所有标签的尺寸
  const resize = () => {
    // 如果不存在list，则不处理
    if (!list.value || list.value.length === 0) {
      return;
    }
    Promise.all([getTabsRect(), getAllItemRect()]).then(
      ([curTabsRects, itemRect = []]: [any, any]) => {
        tabsRect.value = curTabsRects;
        scrollViewWidth.value = 0;
        itemRect.map((item: any, index: number) => {
          // 计算scroll-view的宽度，这里
          scrollViewWidth.value += item.width;
          // 另外计算每一个item的中心点X轴坐标
          list.value[index].rect = item;
        });
        // 获取了tabs的尺寸之后，设置滑块的位置
        setLineLeft();
        setScrollLeft();
      },
    );
  };

  const init = () => {
    sleep(200).then(() => {
      console.log("tabs init");
      resize();
    });
  };

  // 获取各个标签的尺寸
  function queryRect(el: any) {
    // 组件内部一般用this.$uvGetRect，对外的为getRect，二者功能一致，名称不同
    return new Promise((resolve) => {
      getRect(`.${el}`, instance).then((size) => {
        resolve(size);
      });
    });
  }

  return {
    resize,
    lineOffsetLeft,
    innerCurrent,
    init,
    firstTime,
    scrollLeft,
    cardOffsetLeft,
    tabsItemWidth,
  };
};
