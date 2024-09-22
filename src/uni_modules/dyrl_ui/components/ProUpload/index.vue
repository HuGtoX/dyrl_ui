<template>
  <FormItem
    labelAlign="top"
    :cellStyle="customStyle"
    :rules="rules"
    :name="name"
    label="附件上传">
    <div class="file__content">
      <div v-for="item in fileList" :key="item.uid">
        <div v-if="item.status === 'uploading'" class="upload__skeleton">
          <Icon spin size="20" color="#b9bbbe" type="LoadingOutlined"></Icon>
        </div>
        <div class="upload__item" v-else>
          <MyText iconColor="#333" name="file2" :value="item.name" />
          <div class="close-icon-wrapper" @click="deleteItem(item.uid)">
            <Icon v-if="!readOnly" size="12" type="close" />
          </div>
        </div>
      </div>

      <div @click="handlechooseFile" class="upload__skeleton">
        <Icon
          v-if="loading"
          spin
          size="20"
          color="#b9bbbe"
          type="LoadingOutlined"></Icon>
        <Icon v-else size="20" color="#b9bbbe" type="fileAdd"></Icon>
      </div>
    </div>
  </FormItem>
</template>

<script setup lang="ts">
import { type FileList, useOSS } from "../../hooks";
import FormItem from "../FormItem/index.vue";
import MyText from "../Text/index.vue";
import Icon from "../Icon/index.vue";
import { watch } from "vue";
import { isEmpty, concat, cloneDeep } from "lodash-es";

type UploadImageProps = {
  name: string;
  value?: any[];
  defaultValue?: FileList[];
  rules?: any;
  readOnly?: boolean;
  customStyle?: any;
};
const props = defineProps<UploadImageProps>();
const emits = defineEmits(["update:value"]);
const { uploadFiles, loading, fileList } = useOSS();

watch(
  () => props.defaultValue,
  (files) => {
    if (!isEmpty(files)) {
      let clonedObj = cloneDeep(files);
      const concatObj = concat(fileList.value, clonedObj);
      fileList.value = concatObj;
    }
  }
);

watch(fileList, () => {
  let ids = fileList.value.filter((item) => {
    if (item.id) return item.id;
  });
  ids = ids.map((item) => item.id);
  emits("update:value", ids);
});

const deleteItem = (uid) => {
  fileList.value = fileList.value.filter((item) => item.uid !== uid);
};

const handlechooseFile = async () => {
  if (props.readOnly) return;
  if (loading.value) return;

  // #ifdef MP-WEIXIN
  wx.chooseMessageFile({
    success: uploadFiles,
  });
  // #endif

  // #ifdef H5
  uni.chooseFile({
    success: uploadFiles,
  });
  // #endif

  // #ifdef APP-PLUS
  uni.showToast({
    title: "不支持文件上传",
    icon: "error",
  });
  // #endif
};
</script>

<script lang="ts">
export default {
  name: "ProUpload",
  options: {
    virtualHost: true,
  },
};
</script>

<style lang="scss" scoped>
.upload__item {
  display: flex;
  justify-content: space-between;
}
.upload__skeleton {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px dashed #b9bbbe;
  height: 35px;
}

.upload__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 5px;
}
.file__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}
</style>
