<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  console.log("-- [ event ] --", event);
  alert("receiveMessage");
}

onLaunch(() => {});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
* {
  box-sizing: border-box;
}
img {
  border: none;
}
</style>
