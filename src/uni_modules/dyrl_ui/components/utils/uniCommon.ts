export const getRect = (
  selector?: string,
  instance?: any,
  all?: any,
): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> => {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(instance)
      [all ? "selectAll" : "select"](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        }
        if (!all && rect) {
          resolve(rect);
        }
      })
      .exec();
  });
};

/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
export const sys = () => {
  return uni.getSystemInfoSync();
};

// 阻止事件冒泡
export const preventEvent = (e) => {
  e && typeof e.stopPropagation === "function" && e.stopPropagation();
};
// 空操作
export const noop = (e) => {
  preventEvent(e);
};

// 延时函数
export const sleep = (value = 30) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, value);
  });
};
