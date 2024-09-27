<template>
  <Layout>
    <rl-space direction="vertical" size="12">
      <rl-section type="line" title="图标">
        <div class="flex justify-between">
          <div class="flex items-center gap-2 mb-2">
            <rl-text>颜色</rl-text>
            <rl-switch v-model="color" />
          </div>
          <div class="flex items-center gap-2 mb-2">
            <rl-text>旋转</rl-text>
            <rl-switch v-model="spin" />
          </div>
        </div>

        <rl-grid columns="4">
          <rl-grid-item v-for="(item, index) in iconList" :key="index">
            <div @click="() => copyClick(item.name)" class="icon-wrapper">
              <rl-icon
                :color="color ? '#1890ff' : ''"
                :spin="spin"
                size="18"
                :type="item.name" />
              <rl-text size="13" :value="item.name" />
            </div>
          </rl-grid-item>
        </rl-grid>
      </rl-section>
    </rl-space>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";

const spin = ref(false);
const color = ref(false);

const copyClick = (value: string) => {
  uni.setClipboardData({
    data: value,
    success: function () {
      uni.showToast({ title: "复制成功" });
    },
  });
};

const iconList = [
  { name: "plause" },
  { name: "play" },
  { name: "aboutus" },
  { name: "guidance" },
  { name: "audit-time" },
  { name: "community" },
  { name: "qingjia" },
  { name: "chucha" },
  { name: "weixiu" },
  { name: "wupinlingyong" },
  { name: "yongzhangguanli" },
  { name: "success-fill" },
  { name: "gonghao" },
  { name: "flag" },
  { name: "dianhua" },
  { name: "no-image" },
  { name: "attendance-add" },
  { name: "kemu" },
  { name: "search-close" },
  { name: "minus1" },
  { name: "calendar" },
  { name: "tijian" },
  { name: "tice" },
  { name: "exam" },
  { name: "add" },
  { name: "minus" },
  { name: "bumen" },
  { name: "fenxiao" },
  { name: "jiaxiao" },
  { name: "xuexiao" },
  { name: "jiaoyuju" },
  { name: "upload-add" },
  { name: "wifi" },
  { name: "right" },
  { name: "setting1" },
  { name: "loading" },
  { name: "quit" },
  { name: "class" },
  { name: "change" },
  { name: "fileAdd" },
  { name: "Union" },
  { name: "file" },
  { name: "code" },
  { name: "user" },
  { name: "home" },
  { name: "sandian" },
  { name: "sign" },
  { name: "time" },
  { name: "site" },
  { name: "tel-class" },
  { name: "tel-transmit" },
  { name: "tel-phone" },
  { name: "login-user" },
  { name: "login-code" },
  { name: "login-phone" },
  { name: "login-xs" },
  { name: "file2" },
  { name: "time2" },
  { name: "people-count" },
  { name: "device" },
  { name: "metting-time" },
  { name: "index-notice" },
  { name: "index-scan" },
  { name: "index-search" },
  { name: "already_sign" },
  { name: "unsign" },
  { name: "scan" },
  { name: "qrcode" },
  { name: "download" },
  { name: "share" },
  { name: "edit" },
  { name: "huiyishi" },
  { name: "yanshihuiyi" },
  { name: "upload" },
  { name: "file-cover" },
  { name: "close" },
  { name: "point" },
  { name: "system-inform" },
  { name: "notice" },
  { name: "school" },
  { name: "target" },
  { name: "grade" },
  { name: "steps-spot" },
  { name: "check" },
  { name: "reject" },
  { name: "repeal" },
  { name: "wenjuan" },
  { name: "copy" },
  { name: "bianji" },
  { name: "shanchu" },
  { name: "tongji" },
  { name: "mulu" },
  { name: "vertical_line" },
  { name: "setting" },
  { name: "CameraOutline" },
  { name: "AddSquareOutline" },
  { name: "MailOutlined" },
  { name: "MobileOutlined" },
  { name: "LoadingOutlined" },
  { name: "LockOutline" },
  { name: "UserOutline" },
  { name: "LeftOutline" },
  { name: "building" },
  { name: "CheckCircleFill" },
  { name: "ExclamationCircleFill" },
  { name: "RightOutline" },
  { name: "CloseOutline" },
  { name: "CheckOutline" },
];
</script>

<style scoped>
.icon-wrapper {
  padding: 0 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  height: 80px;
  border: 1px solid #ccc;
}
</style>
