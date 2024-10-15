import { isArray, isEmpty, isFunction } from "lodash-es";
import { type Ref } from "vue";
type RouterOptions = {
  // 校验路由参数
  validateParams?: (options: any) => Promise<boolean> | boolean | string[];
};

interface ParamsType {
  [key: string]: any;
}

const useRouter = (routeOptions: RouterOptions = {}) => {
  const { validateParams } = routeOptions;
  const isWrong = ref(false);
  let params: Ref<ParamsType> = ref({});

  onLoad(async (options = {}) => {
    params.value = options;

    if (validateParams && isFunction(validateParams)) {
      isWrong.value = (await validateParams(options)) as boolean;
    }

    if (validateParams && isArray(validateParams)) {
      const keys = Object.keys(options);
      isWrong.value = validateParams.some((key) => !keys.includes(key));
    }

    if (isWrong.value) {
      uni.showToast({
        icon: "none",
        title: "该地址不是个有效路径，即将跳转主页",
      });

      setTimeout(() => {
        uni.switchTab({ url: "/pages/home/index" });
      }, 1000);
    }
  });

  const hasParams = computed(() => !isEmpty(params.value));
  const ready = computed(() => hasParams.value && !isWrong.value);

  return { params: readonly(params), hasParams, ready };
};

export default useRouter;
