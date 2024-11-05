# 微信和企业微信SDK配置

::: info
[微信网页授权](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
:::

### 微信SDK配置

```js
// JSSDK地址
<script src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js "></script>;

wx.config({
  beta: true,
  appId: res.app_id,
  timestamp: res.timestamp,
  nonceStr: res.nonce_str,
  signature: res.signature,
  jsApiList: [], //必填，传入需要使用的接口名称
  openTagList: [],
});
```

### 企业微信SDK配置

```js
import * as ww from "@wecom/jssdk";

async function getConfigSignature(url) {
  const config = await request({ url });
  return {
    timestamp: config.timestamp,
    nonceStr: config.nonce_str,
    signature: config.signature,
  };
}
async function getAgentConfigSignature(url) {
  const config = await request({ url });
  return {
    timestamp: config.timestamp,
    nonceStr: config.nonce_str,
    signature: config.signature,
  };
}
ww.register({
  corpId: "xxxxxxxx", // 必填，当前用户企业所属企业ID
  agentId: xxxxxx, // 必填，当前应用的AgentID
  jsApiList: [], // 必填，需要使用的JSAPI列表
  getConfigSignature, // 必填，根据url生成企业签名的回调函数
  getAgentConfigSignature, // 必填，根据url生成应用签名的回调函数
});
```

## 微信和企业微信环境判断

```js
export function envJudge() {
  const isMobile = window.navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ); // 是否手机端
  const isWx = /micromessenger/i.test(navigator.userAgent); // 是否微信
  const isComWx = /wxwork/i.test(navigator.userAgent); // 是否企业微信
  if (isComWx && isMobile) {
    //手机端企业微信
    return "com-wx-mobile";
  } else if (isComWx && !isMobile) {
    //PC端企业微信
    return "com-wx-pc";
  } else if (isWx && isMobile) {
    // 手机端微信
    return "wx-mobile";
  } else if (isWx && !isMobile) {
    // PC端微信
    return "wx-pc";
  } else {
    return "other";
  }
}
```
