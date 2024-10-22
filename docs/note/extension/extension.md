# 浏览器扩展

::: info

1. [Chrome 扩展开发](https://developer.chrome.com/docs/extensions/get-started?hl=zh-cn)
2. [Edge 扩展开发](https://learn.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/getting-started/part1-simple-extension?tabs=v3)
3. [Chrome插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#%E9%95%BF%E8%BF%9E%E6%8E%A5%E5%92%8C%E7%9F%AD%E8%BF%9E%E6%8E%A5)
4. [MDN-浏览器扩展](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/What_are_WebExtensions)
5. [猫抓(cat catch)](https://github.com/xifangczy/cat-catch)
6. [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy)
7. [Jquery Api 速查表](https://www.sunpop.cn/documentation/jq/index.html)

:::

::: tip
开发扩展遇到无法实现的功能时，可以尝试查看和借鉴其他插件的源码。(需要注意Manifest 版本问题，配置和写法上有些差异)  
存储位置： C:\Users\用户名\AppData\Local\Microsoft\Edge\User Data\Default\Extensions  
扩展的文件夹名称就是插件的ID，可以在浏览器扩展管理里看到  
如果没有该路径的话可以使用 [Everything](https://soft.aijiaer11.cn/soft/4144.html?bd_vid=10482434094565521966) 查找ID名称
:::

浏览器扩展是浏览器的一个特性，它允许我们为浏览器添加一些功能，比如修改网页内容、添加新功能、修改网页样式等。
借助 Chrome 的扩展程序 API，您可以改变浏览器的工作方式

基于 Chromium 内核的浏览器的扩展在不同浏览器之间是兼容的，除了一些特殊功能需要做些调整和适配，所以浏览器扩展的实现方式也基本相同。

基于 Chromium 的浏览器：

- Chrome
- Opera
- Microsoft Edge

---

因为平时使用频率比较高的浏览器是Edge，所以接下来主要以Edge浏览器扩展的实现为示例

## 扩展程序的组成

Chrome 扩展程序由担任不同角色的组件组成：

1. manifest.json
2. Service Worker
3. 内容脚本
4. 工具栏操作
5. 侧边面板
6. DeclarativeNetRequest

## 快速上手

### 1. 创建manifest.json文件

首先，创建一个用于存储扩展程序文件的新目录，并在此目录里创建**manifest.json**文件。
**manifest.json**是扩展包里最基础和必要的文件，此 JSON 文件描述了扩展程序的功能和配置，必须放在根目录。  
[manifest.json 键列表](https://developer.chrome.com/docs/extensions/reference/manifest?hl=zh-cn#side-panel)

```json
// manifest.json
{
  "name": "Scroll Top",
  "version": "0.0.1",
  // Manifest V3
  // https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3?hl=zh-cn
  "manifest_version": 3,
  "description": "An extension to scroll the page to top.",
  // 需要在引用的文件夹路径存放不同尺寸的icon文件，这里为了省事引用的都是同一个文件
  "icons": {
    "16": "icons/icon.png", // 扩展程序页面和上下文菜单上的网站图标。
    "32": "icons/icon.png", // Windows 计算机通常需要此大小。
    "48": "icons/icon.png", // 显示在“扩展程序”页面上。
    "128": "icons/icon.png" // 在安装和 Chrome 应用商店中显示。
  },
  "action": {
    "default_popup": "popup/popup.html",
    "default_title": "这是一个示例扩展"
  },
  // 需要直接注入页面的JS
  "content_scripts": [{}],
  // 权限申请
  // https://developer.chrome.com/docs/extensions/reference/permissions-list?hl=zh-cn
  "permissions": []
}
```

### 2. 创建默认弹出对话框文件

创建一个 HTML 在用户启动扩展时要运行的文件。 在名为 popup 的目录中创建名为 的 popup.html 文件。 当用户选择图标以启动扩展时， popup/popup.html 将显示为模式对话框。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .popup {
        width: 120px;
      }
    </style>
  </head>
  <body>
    <div class="popup">返回顶部插件</div>
  </body>
</html>
```

### 3. 在Edge中添加扩展

1. 打开扩展管理页，并将开发人员模式打开。
   ![alt text](/static/extension1.png)
2. 首次安装扩展时，单击“ 加载解压缩的扩展” 按钮。 此时 会打开“选择扩展目录 ”对话框。
3. 选择包含扩展源文件的目录，然后单击“ 选择文件夹 ”按钮。

完成以上步骤后，扩展中将会出现你刚创建的扩展。
![alt text](/static/extension2.png)

### 4. 创建内容脚本

1. 在扩展程序目录中，创建一个名为 content-script 的目录，并在其中创建一个名为 scrollTop.js 的文件。
   接下来我们需要为 scrollTop.js 添加回到顶部的功能

```js
function addStyle(css) {
  try {
    var style = document.createElement("style");
    style.textContent = css;
    (
      document.head ||
      document.body ||
      document.documentElement ||
      document
    ).appendChild(style);
  } catch (e) {
    console.log("Error: env: adding style " + e);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  addStyle(`.BackToTop {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 1000;}`);

  const button = document.createElement("button");
  button.className = "BackToTop";
  button.textContent = "Back to Top";
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function handleScroll() {
    if (window.scrollY > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  window.addEventListener("scroll", handleScroll);
  document.body.appendChild(button);
});
```

创建完脚本文件后，需要在manifest.json中添加如下配置：

```js
 "content_scripts": [
    {
      // "<all_urls>" 表示匹配所有地址
      "matches": ["<all_urls>"],
      "js": [ "js/content-script.js"],
      // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
      "run_at": "document_start"
    }
  ],
```

完成以上步骤后，我们需要在插件管理页面去刷新插件，此时插件将会生效。
![alt text](/static/reload.png)
随便打开个网站，然后滚动到一定的高度后我们可以看到页面多了一个回到顶部的功能。

::: tip

- 至此，我们就完成了一个比较简单的回到顶部的扩展。

- 接下来我们将继续优化和拓展我们的扩展，以满足更多需求。
  :::

## Service Worker

在 Chrome 扩展中，“background”通常指的是扩展的后台脚本。

在 Manifest V3 中，后台页面被 Service Worker 所取代。下面列出了清单更改。下面列出了清单更改。

- 将 manifest.json 中的 "background.scripts" 替换为 "background.service_worker"。请注意，"service_worker" 字段接受字符串，而不是字符串数组。
- 从 manifest.json 中移除 "background.persistent"。

如需了解详情，请参阅 [Extension Service Worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics?hl=zh-cn#import-scripts) 基础知识

**一、作用**

1. 持续运行

   - 可以在后台持续运行，不依赖于特定的网页打开状态。即使你没有打开任何网页或者关闭了所有浏览器窗口，后台脚本也可以执行特定的任务。
   - 例如，一些广告拦截扩展在后台持续监测网络请求，以拦截广告。

2. 事件监听

   - 可以监听各种浏览器事件，如浏览器启动、标签页打开或关闭、网络请求等。
   - 当特定事件发生时，后台脚本可以采取相应的行动。比如，一个云存储扩展可以在检测到文件下载完成时，自动将文件备份到云端。

3. 与其他部分通信
   - 后台脚本可以与扩展的其他部分（如内容脚本、弹窗页面等）进行通信。
   - 这使得不同部分可以协同工作，实现扩展的功能。例如，一个翻译扩展的后台脚本接收来自内容脚本的翻译请求，并将翻译结果返回给内容脚本以显示在网页上。

**二、特点**

1. 低资源占用

   - Chrome 对后台脚本的资源使用进行了优化，以确保它们不会过度消耗系统资源。后台脚本通常在需要时才会执行特定任务，而不是一直占用大量的 CPU 和内存。

2. 权限控制

   - 后台脚本的权限受到严格控制，以确保安全性。它们只能访问扩展被授权的资源和功能，不能随意访问用户的隐私数据或系统的敏感部分。

3. 可配置性
   - 开发人员可以通过扩展的配置文件来控制后台脚本的行为。这包括设置后台脚本的触发条件、指定要监听的事件等。

总之，“background”在 Chrome 扩展中扮演着重要的角色，它为扩展提供了持续运行、事件监听和通信的能力，使得扩展能够实现各种强大的功能。

在 Chrome 扩展的后台脚本中，可以通过以下几种方式与网页进行交互：

**一、使用内容脚本（Content Scripts）**

1. 注入内容脚本

   - 后台脚本可以向特定的网页注入内容脚本。内容脚本在网页的上下文中运行，可以直接访问和操作网页的 DOM（文档对象模型）。
   - 例如，你可以在后台脚本中使用 `chrome.tabs.executeScript` 方法向当前活动标签页注入一个内容脚本，该内容脚本可以修改网页的样式、获取网页中的数据或者添加新的元素。

2. 通信机制
   - 后台脚本和内容脚本之间可以通过 `chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage` 进行通信。
   - 当内容脚本需要向后台脚本发送数据或请求特定的操作时，可以使用 `chrome.runtime.sendMessage` 发送消息。后台脚本可以通过监听 `chrome.runtime.onMessage` 事件来接收这些消息，并做出相应的处理。同样，后台脚本也可以向内容脚本发送消息，以指示内容脚本执行某些操作。

**二、监听网页事件**

1. 网络请求监听

   - 后台脚本可以使用 `chrome.webRequest` API 监听网页的网络请求。这可以用于拦截、修改或分析网页发出的请求。
   - 例如，一个广告拦截扩展可以监听网络请求，阻止特定的广告服务器的请求。

2. 标签页事件监听
   - 后台脚本可以监听标签页的事件，如标签页的加载完成、更新、激活等。通过 `chrome.tabs.onUpdated`、`chrome.tabs.onActivated` 等 API 可以实现对标签页状态的监测。
   - 当标签页加载完成时，后台脚本可以执行特定的操作，比如检查网页是否符合特定的条件，并根据情况进行相应的处理。

**三、使用存储 API**  
Web 平台的 Storage 接口（可从 window.localStorage 访问）无法在 Service Worker 中使用。

- Chrome 扩展有自己的存储区域，可以使用 `chrome.storage` API 进行读写。后台脚本可以将数据存储在扩展存储中，然后网页可以通过与扩展进行通信来获取这些数据。
- 这种方式可以在不同的标签页和不同的网页之间共享数据，并且数据的存储和访问更加安全和可控。

总之，通过使用内容脚本、监听网页事件和利用存储 API，后台脚本可以与网页进行有效的交互，实现各种扩展功能。在进行交互时，需要注意权限和安全性问题，确保扩展的行为符合用户的期望和浏览器的安全策略。
