<template>
  <Drawer
    :maskClick="() => emit('update:show', false)"
    bodyStyle="height:60vh"
    ref="drawerRef"
    :title="placeholder">
    <div class="tabs__wrapper">
      <scroll-view scroll-x>
        <div class="tabs">
          <div
            :class="['tab__item', { 'tab__item--active': activeTab === index }]"
            @click="() => (activeTab = index)"
            v-for="(tab, index) in tabs"
            :key="index">
            {{ tab.selected ? tab.selected.text : "请选择" }}
          </div>
        </div>
      </scroll-view>

      <div class="swiper__wrapper">
        <scroll-view scroll-y>
          <div
            v-for="(option, tabIndex) in tabs[activeTab]?.options"
            class="list__item"
            :key="tabIndex"
            :aria-checked="selected"
            @click="() => onSelect(option, activeTab)">
            <span>{{ option.text }}</span>
            <Icon
              v-if="tabs[activeTab].selected?.value === option.value"
              color="#0173fc"
              type="check" />
          </div>
          <Empty
            description="暂无数据"
            v-if="isEmpty(tabs[activeTab]?.options)" />
        </scroll-view>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import Icon from "../icon/index.vue";
import Empty from "../Empty";
import Drawer from "../Drawer/index.vue";
import { isEmpty } from "lodash-es";
import type { DataTree, CascaderTab, CascaderOption } from "./type";
import { ref, nextTick, watch } from "vue";
/**
 * DataPicker 级联选择
 * @description 支持单列、和多列级联选择。列数没有限制，如果屏幕显示不全，顶部tab区域会左右滚动。
 * @property {String} popup-title 弹出窗口标题
 * @property {Boolean} border = [true|false] 是否有边框
 * @property {Boolean} disabled = [true|false] 是否仅读
 */
type CascadeProps = {
  show?: boolean;
  modelValue?: string | number;
  arrow?: boolean;
  title?: string;
  placeholder?: string;
  width?: string | number;
  dataTree: DataTree[];
  icon?: string;
};

const emit = defineEmits([
  "change",
  "update:modelValue",
  "update:show",
  "finish",
]);
const props = withDefaults(defineProps<CascadeProps>(), {
  placeholder: "请选择",
  icon: "RightOutline",
});
const drawerRef = ref();
const selected = ref();
const activeTab = ref(0);
const tabs = ref<CascaderTab[]>([]);

const getSelectedOptionsByValue = (
  options: CascaderOption[],
  value: number | string
): CascaderOption[] | undefined => {
  for (const option of options) {
    if (option.value === value) {
      return [option];
    }

    if (option.children) {
      const selectedOptions = getSelectedOptionsByValue(option.children, value);
      if (selectedOptions) {
        return [option, ...selectedOptions];
      }
    }
  }
};
const updateTabs = () => {
  const { dataTree: options, modelValue } = props;
  if (modelValue !== undefined) {
    const selectedOptions = getSelectedOptionsByValue(options, modelValue);

    if (selectedOptions) {
      let optionsCursor = options;
      tabs.value = selectedOptions.map((option) => {
        const tab = {
          options: optionsCursor,
          selected: option,
        };
        const next = optionsCursor.find((item) => item.value === option.value);
        if (next) {
          optionsCursor = next.children!;
        }
        return tab;
      });

      if (optionsCursor) {
        tabs.value.push({
          options: optionsCursor,
          selected: null,
        });
      }

      nextTick(() => {
        activeTab.value = tabs.value.length - 1;
      });
      return;
    }
  }

  tabs.value = [
    {
      options,
      selected: null,
    },
  ];
};
const onSelect = (option: DataTree, tabIndex: number) => {
  if (option.disabled) {
    return;
  }
  tabs.value[tabIndex].selected = option;
  if (tabs.value.length > tabIndex + 1) {
    tabs.value = tabs.value.slice(0, tabIndex + 1);
  }
  if (option["children"]) {
    const nextTab = {
      options: option["children"],
      selected: null,
    };

    if (tabs.value[tabIndex + 1]) {
      tabs.value[tabIndex + 1] = nextTab;
    } else {
      tabs.value.push(nextTab);
    }

    nextTick(() => {
      activeTab.value++;
    });
  }

  const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);

  emit("update:modelValue", option.value);

  const params = {
    value: option.value,
    tabIndex,
    selectedOptions,
  };

  emit("change", params);

  if (!option["children"]) {
    emit("finish", params);
  }
};

watch(() => props.dataTree, updateTabs, { immediate: true, deep: true });
watch(
  () => props.show,
  (value) => {
    if (value) drawerRef.value.open();
    else drawerRef.value.close();
  }
);
</script>

<script lang="ts">
export default {
  name: "Cascade",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.tabs__wrapper {
  padding: 0 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .tabs {
    display: flex;
    border-bottom: 1px solid #b9bbbe;
    .tab__item {
      position: relative;
      padding: 0 12px;
      padding-bottom: 12px;
      &--active {
        &::after {
          content: "";
          position: absolute;
          border-top: 1px solid var(--rl-primary-color);
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }

  .swiper__wrapper {
    margin-top: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .list__item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
}
</style>
