import { computed, readonly, ref, shallowReadonly, watch } from "vue";
import { useBoolean, useRequest } from "../index";
import type {
  UseInfiniteData,
  UseInfiniteScrollOptions,
  UseInfiniteService,
} from "./types";

const useInfiniteScroll = <TData extends UseInfiniteData>(
  service: UseInfiniteService<TData>,
  options: UseInfiniteScrollOptions<TData> = {}
) => {
  const {
    isNoMore,
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const finalData = ref<TData>();
  const [loadingMore, { set: setLoadingMore }] = useBoolean();

  const setFinalData = (mutateData: any) => {
    finalData.value = mutateData;
  };

  const noMore = computed(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData.value);
  });

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData);

      if (!lastData) {
        finalData.value = currentData;
      } else {
        finalData.value = {
          ...currentData,

          list: [...lastData.list, ...currentData.list],
        };
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => onSuccess?.(d),
      onError: (e) => onError?.(e),
    }
  );

  const loadMore = () => {
    if (noMore.value) return;
    setLoadingMore(true);
    run(finalData.value);
  };

  const loadMoreAsync = () => {
    if (noMore.value) return;
    setLoadingMore(true);
    return runAsync(finalData.value);
  };

  const reload = () => {
    run();
  };
  const reloadAsync = () => runAsync();

  watch(reloadDeps, () => {
    run();
  });

  const _loading = computed(() => loadingMore.value || loading.value);

  return {
    data: shallowReadonly(finalData),
    loading: _loading,
    loadingMore,
    noMore,
    loadMore: loadMore,
    loadMoreAsync: loadMoreAsync,
    reload: reload,
    reloadAsync: reloadAsync,
    mutate: setFinalData,
    cancel,
  };
};

export default useInfiniteScroll;
