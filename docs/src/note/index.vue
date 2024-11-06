<template>
  <div class="daily-picture"><img :src="picture" /></div>
  <div class="daily-sentence">{{ sentence }}</div>

  <div class="daily-history">历史上的今天({{ today }})</div>
  <ul>
    <li v-for="item in history" :key="item">{{ item.title }}</li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const baseUrl = import.meta.env.DEV ? "/tenapi.cn" : "https://tenapi.cn";

const dailySentenceApi = baseUrl + "/v2/yiyan";
const dailyPicture = baseUrl + "/v2/bing";
const dailyHistory = baseUrl + "/v2/history";

const sentence = ref("");
const picture = ref("");
const history = ref("");
const today = ref("");

onMounted(async () => {
  // 随机一言
  sentence.value = await axios
    .post(dailySentenceApi, { format: "json" })
    .then((res) => res.data);
  // 每日壁纸
  axios.post(dailyPicture).then((res) => {
    const { responseURL } = res.request;
    picture.value = responseURL;
  });
  // 历史上的今天
  axios.post(dailyHistory).then((res) => {
    const { data } = res.data;
    history.value = data.list;
    today.value = data.today;
  });
});
</script>

<style>
.daily-sentence {
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
}
.daily-picture {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
}
.daily-history {
  margin-top: 25px;
  font-size: 18px;
  font-weight: 550;
}
</style>
