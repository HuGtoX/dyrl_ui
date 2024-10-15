<template>
  <div :class="name" id="list" :style="customStyle">
    <scroll-view
      :class="bem('scroll-view')"
      :refresher-enabled="true"
      :scroll-y="true"
      :refresher-triggered="loading"
      :refresher-threshold="refresherThreshold"
      refresher-default-style="none"
      refresher-background="var(--rl-list-view-background)"
      enable-back-to-top
      @scrolltolower="onScrollTolower"
      @refresherrefresh="onRefresherRefresh"
      @refresherpulling="onRefresherPulling"
      @refresherrestore="onRefresherRestore"
      @refresherabort="onRefresherRestore">
      <div v-if="refreshLoading" :class="bem('custom-refresher-view')">
        <div :class="bem('custom-refresher-placeholder')"></div>
        <!-- 下拉刷新view -->
        <div :class="bem('custom-refresher-slot-view')">
          <slot v-if="refresh" name="refresh">
            <Loading type="spinner">加载中...</Loading>
          </slot>
          <div v-else>
            <slot name="pre-refresh">
              {{ reachRefresh ? "释放即可刷新" : "继续下拉即可刷新" }}
            </slot>
          </div>
        </div>
      </div>

      <div id="list-content" :class="bem('content')">
        <slot></slot>
      </div>

      <div
        :class="bem('empty')"
        v-if="!loading && isEmpty(data?.list) && empty">
        <Empty description="暂无数据" />
      </div>

      <!-- h5Loading是为了解决在H5和app中首次加载不显示loading状态的情况 -->
      <!-- #ifdef H5 || APP-PLUS -->
      <div :class="bem('loading-more')" v-if="h5Loading">
        <Loading :color="loadingColor" type="spinner">加载中...</Loading>
      </div>
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN  -->
      <div :class="bem('loading-more')" v-if="loadingMore">
        <Loading :color="loadingColor" type="spinner">加载中...</Loading>
      </div>
      <!-- #endif -->

      <div
        :class="bem('no-more')"
        v-if="!loading && !hasMore && !isEmpty(data?.list)">
        <slot name="no-more">
          <span type="spinner">{{ noMoreText }}</span>
        </slot>
      </div>
    </scroll-view>
  </div>
</template>
<script setup lang="ts">
import { provide, computed, ref, watch } from "vue";
import { useInfiniteScroll, useUpdate } from "../../hooks";
import { createNamespace } from "../utils";
import { isEmpty, isEqual } from "lodash-es";
import Empty from "../empty/index.vue";
import Loading from "../loading/index.vue";
import { getRect } from "../utils";

type ListViewProps = {
  // 每个业务的 uniqkey，用于订阅或者缓存
  uniqkey?: string;
  request: (params: any) => Promise<any>;
  emptyMode?: "data" | "message" | "meeting";
  params?: Record<string, any>;
  pageSize?: number;
  customStyle?: any;
  refresherThreshold?: number;
  noMoreText?: string;
  empty?: boolean;
  loadingColor?: string;
};
const [name, bem] = createNamespace("list-view");
const props = withDefaults(defineProps<ListViewProps>(), {
  refresherThreshold: 40,
  noMoreText: "没有更多了",
  empty: true,
});
const emit = defineEmits(["change"]);

// 注册全局订阅事件
const update = async () => {
  reload();
};
const uniKey = props.uniqkey ? `list-${props.uniqkey}` : null;
useUpdate(uniKey, update);

const PAGE_SIZE = computed(() => props.pageSize ?? 15);
const params = computed(() => props.params);
const isFirst = ref(true);
const instance = ref(getCurrentInstance());
const h5Loading = computed(() => {
  return (
    (isFirst.value && loading.value && !refreshLoading.value) ||
    loadingMore.value
  );
});

const { data, loading, loadingMore, loadMore, reload, mutate } =
  useInfiniteScroll(
    async (d) => {
      const current = d ? Math.ceil(d.list.length / PAGE_SIZE.value) + 1 : 1;

      // #ifdef H5
      isFirst.value = current === 1;
      // #endif

      return props
        .request({ current, pageSize: PAGE_SIZE.value, ...params.value })
        .then((res) => {
          return {
            list: res.data || [],
            total: res.total || 0,
          };
        });
    },
    {
      // 如果首次列表高度无法触底，则自动执行loadMore
      async onSuccess() {
        await nextTick();
        const contentRect = (await getRect(
          "#list-content",
          instance.value
        )) as UniApp.NodeInfo;
        const wrapRect = (await getRect(
          "#list",
          instance.value
        )) as UniApp.NodeInfo;

        if (contentRect.height < wrapRect.height) {
          if (!isEmpty(data.value?.list)) {
            if (data.value.list.length < data.value.total) {
              loadMore();
              console.log("watchEffect 自动触底刷新");
              isFirstScrollToLowe.value = true;
            }
          }
        }
      },
    }
  );

// 请求参数更新
watch(params, (newParams, oldParams) => {
  if (!isEqual(newParams, oldParams)) {
    // 重置列表数据
    mutate((oldData) => ({ ...oldData, list: [] }));
    console.log("请求参数更新");
    update();
  }
});

watch(data, (val) => {
  emit("change", val);
});

const refresh = ref(false);
const refreshOffsetY = ref(0);

const refreshLoading = computed(() => {
  return refreshOffsetY.value !== 0 || refresh.value;
});
const hasMore = computed(
  () => data.value && data.value?.list.length < data.value.total
);

const reachRefresh = computed(
  () => refreshOffsetY.value > props.refresherThreshold + 5
);

const onRefresherRestore = () => {
  refresh.value = false;
  refreshOffsetY.value = 0;
};
const onRefresherPulling = (event: any) => {
  const deltaY = event.detail.deltaY ?? event.detail.dy;
  refreshOffsetY.value = deltaY;
};

// 上拉刷新
const onRefresherRefresh = () => {
  console.log("-- [ onRefresherRefresh ] --", "上拉刷新");
  refresh.value = true;

  if (refreshOffsetY.value === 0) return;
  if (!loading.value) {
    reload();
  }
};

// 触底事件
const isFirstScrollToLowe = ref(false);
const onScrollTolower = () => {
  isFirstScrollToLowe.value = true;
  if (!loadingMore) return;
  if (!loading.value && hasMore.value) {
    console.log("触底刷新");
    loadMore();
  }
};

// watchEffect(async () => {
//   if (isFirstScrollToLowe.value) return;
//   if (!isEmpty(data.value?.list)) {
//     if (data.value.list.length < data.value.total) {
//       console.log("watchEffect 自动触底刷新");
//       loadMore();
//       isFirstScrollToLowe.value = true;
//     }
//   }
// });

provide("data", data);
defineExpose({
  data: computed(() => data.value?.list),
});
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true,
  },
};
</script>

<style scoped lang="scss">
.rl-list-view {
  --rl-list-view-background: transparent;
  --rl-list-view-padding: 15px;
  --rl-loading-more-background: var(--rl-gray-1);
  --rl-loading-text-color: var(--rl-text-color-2);
  --rl-list-text-line-height: 50px;
}
.rl-list-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 100%;
  //   background: var(--rl-loading-more-background);

  background: var(--rl-list-view-background);

  &__empty {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  }

  &__scroll-view {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  &__content {
    display: flex;
    padding: var(--rl-list-view-padding);
    background: var(--rl-view-list-background);
    flex-direction: column;
  }

  &__no-more,
  &__custom-refresher-view,
  &__loading-more {
    display: flex;
    color: var(--rl-loading-text-color);
    line-height: var(--rl-list-text-line-height);
    justify-content: center;
  }

  &__custom-refresher-view {
    margin-top: -35px;
    z-index: 99;
  }
  &__custom-refresher-slot-view {
    height: 35px;
    transform: translateY(-10px);
  }
}
</style>
