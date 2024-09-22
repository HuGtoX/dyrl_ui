import { ref, onMounted, onUnmounted, watch } from "vue";
type Props = {
  seconds?: number;
  changeText?: string;
  startText?: string;
  endText?: string;
  uniqueKey?: string;
  keepRunning?: boolean;
  start?: () => void;
  end?: (text?: string) => void;
};
const key = "rl_CountDownTimestamp";

const useCode = (props: Props = {}) => {
  const {
    keepRunning = false,
    changeText = "X秒后重新获取",
    startText = "获取验证码",
    endText = "重新获取",
    seconds = 60,
  } = props;

  const uniqueKey = props.uniqueKey + key;

  let timer: any = null;
  const canGetCode = ref(true);
  const tips = ref(startText);
  const secNum = ref(seconds);

  watch(
    () => seconds,
    (n) => {
      secNum.value = n;
    },
    { immediate: true },
  );

  onMounted(() => {
    checkKeepRunning();
  });

  onUnmounted(() => {
    setTimeToStorage();
    clearTimeout(timer);
    timer = null;
  });

  function changeEvent(text: string) {
    tips.value = text;
  }

  function checkKeepRunning() {
    // 获取上一次退出页面(H5还包括刷新)时的时间戳，如果没有上次的保存，此值可能为空
    const lastTimestamp = Number(uni.getStorageSync(uniqueKey));
    if (!lastTimestamp) return changeEvent(startText);
    // 当前秒的时间戳
    const nowTimestamp = Math.floor(+new Date() / 1000);
    // 判断当前的时间戳，是否小于上一次的本该按设定结束，却提前结束的时间戳
    if (keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
      // 剩余尚未执行完的倒计秒数
      secNum.value = lastTimestamp - nowTimestamp;
      // 清除本地保存的变量
      uni.removeStorageSync(uniqueKey);
      // 开始倒计时
      start();
    } else {
      // 如果不存在需要继续上一次的倒计时，执行正常的逻辑
      changeEvent(startText);
    }
  }

  // 开始倒计时
  const start = () => {
    console.log("start");

    // 防止快速点击获取验证码的按钮而导致内部产生多个定时器导致混乱
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    props?.start?.();

    canGetCode.value = false;
    // 这里放这句，是为了一开始时就提示，否则要等setInterval的1秒后才会有提示
    changeEvent(changeText?.replace(/x|X/, String(secNum.value)));
    timer = setInterval(() => {
      if (--secNum.value) {
        // 用当前倒计时的秒数替换提示字符串中的"x"字母
        changeEvent(changeText?.replace(/x|X/, String(secNum.value)));
      } else {
        clearInterval(timer as number);
        timer = null;
        changeEvent(endText);
        secNum.value = seconds;
        props.end?.("end");
        canGetCode.value = true;
      }
    }, 1000);
  };

  // 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
  function setTimeToStorage() {
    if (!keepRunning || !timer) return;
    // 记录当前的时间戳，为了下次进入页面，如果还在倒计时内的话，继续倒计时
    // 倒计时尚未结束，结果大于0；倒计时已经开始，就会小于初始值，如果等于初始值，说明没有开始倒计时，无需处理
    if (secNum.value > 0 && secNum.value <= seconds) {
      // 获取当前时间戳(+ new Date()为特殊写法)，除以1000变成秒，再去除小数部分
      const nowTimestamp = Math.floor(+new Date() / 1000);
      // 将本该结束时候的时间戳保存起来 => 当前时间戳 + 剩余的秒数
      uni.setStorage({
        key: uniqueKey,
        data: nowTimestamp + Number(secNum),
      });
    }
  }

  return { start, tips, canGetCode };
};

export default useCode;
