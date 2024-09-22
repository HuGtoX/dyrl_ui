# UniApp NFC识别代码

```ts
import bytesToHexString from "@/utils/bytesToHexString";
import reverseTwo from "@/utils/reverseTwo";

const useNfc = () => {
  let NfcAdapter;
  let nfc;
  let nfcCallback;
  let NdefRecord;
  let NdefMessage;

  const nfcType = ref("cardNo");

  function init() {
    try {
      let main = plus.android.runtimeMainActivity();
      let Intent = plus.android.importClass("android.content.Intent");
      let Activity = plus.android.importClass("android.app.Activity");
      let PendingIntent = plus.android.importClass("android.app.PendingIntent");
      let IntentFilter = plus.android.importClass(
        "android.content.IntentFilter"
      );
      NfcAdapter = plus.android.importClass("android.nfc.NfcAdapter");
      nfc = NfcAdapter.getDefaultAdapter(main);

      if (nfc == null) {
        uni.showToast({
          title: "设备不支持NFC！",
          icon: "none",
        });
        return;
      }

      if (!nfc.isEnabled()) {
        uni.showToast({
          title: "请在系统设置中先启用NFC功能！",
          icon: "none",
        });
        return;
      }

      let intent = new Intent(main, main.getClass());
      intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
      let pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);
      let ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");
      let tag = new IntentFilter("android.nfc.action.TAG_DISCOVERED");
      ndef.addDataType("*/*");
      let intentFiltersArray = [ndef, tag];
      let techListsArray = [
        ["android.nfc.tech.MifareClassic"],
        ["android.nfc.tech.MifareUltralight"],
      ];
      plus.globalEvent.addEventListener(
        "newintent",
        function () {
          readCardNo();
        },
        false
      );
      plus.globalEvent.addEventListener(
        "pause",
        function (e) {
          if (nfc) {
            nfc.disableForegroundDispatch(main);
          }
        },
        false
      );
      plus.globalEvent.addEventListener(
        "resume",
        function (e) {
          if (nfc) {
            nfc.enableForegroundDispatch(
              main,
              pendingIntent,
              intentFiltersArray,
              techListsArray
            );
          }
        },
        false
      );
      nfc.enableForegroundDispatch(
        main,
        pendingIntent,
        intentFiltersArray,
        techListsArray
      );
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 监听
   */
  function readCardNo() {
    NdefRecord = plus.android.importClass("android.nfc.NdefRecord");
    NdefMessage = plus.android.importClass("android.nfc.NdefMessage");
    var main = plus.android.runtimeMainActivity();
    var intent = main.getIntent();
    if ("android.nfc.action.TECH_DISCOVERED" == intent.getAction()) {
      if (nfcType.value === "cardNo") {
        __read_no(intent);
      } else {
        __read(intent);
      }
    }
  }

  /**
   * 读取内容
   */
  function __read(intent) {
    var Parcelable = plus.android.importClass("android.os.Parcelable");
    var rawmsgs = intent.getParcelableArrayExtra(
      "android.nfc.extra.NDEF_MESSAGES"
    );
    if (rawmsgs) {
      const records = rawmsgs[0].getRecords();
      var result = records[0].getPayload();
      var s = plus.android.newObject("java.lang.String", result);
      const data = {
        type: nfcType.value,
        text: s,
      };
      if (typeof s === "string") {
        nfcCallback({
          code: 200,
          data,
          message: "读取成功",
        });
      } else {
        nfcCallback({
          code: 500,
          data,
          message: "数据为空",
        });
      }
    } else {
      nfcCallback({
        code: 500,
        data: {
          type: nfcType.value,
          text: "",
        },
        message: "数据为空",
      });
    }
  }
  /**
   * 读取卡号
   */
  function __read_no(intent) {
    let tag = plus.android.importClass("android.nfc.Tag");
    tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
    const bytesId = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);
    const tagid = reverseTwo(bytesToHexString(tag.getId()));
    nfcCallback({
      code: 200,
      data: {
        type: nfcType.value,
        id: parseInt(tagid, 16),
        reverseTagId16: tagid,
        tagId16: bytesToHexString(tag.getId()),
        bytesIds: tag.getId(),
      },
      message: "读取成功",
    });
  }

  function close() {
    if (nfc) {
      let main = plus.android.runtimeMainActivity();
      nfc.disableForegroundDispatch(main);
    }
  }

  function initNFC(callback) {
    if (uni.getSystemInfoSync().platform == "android") {
      nfcCallback = callback;
      init();
    }
  }

  function closeNFC() {
    nfcCallback = null;
    if (uni.getSystemInfoSync().platform == "android") {
      close();
    }
  }

  return { initNFC, closeNFC, nfcType };
};

export default useNfc;
```

### bytesToHexString

```ts
// 将字节数组转换为十六进制字符串
function bytesToHexString(inarray) {
  let i, j, x;
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let out = "";
  for (j = 0; j < inarray.length; ++j) {
    x = parseInt(inarray[j]) & 0xff;
    i = (x >> 4) & 0x0f;
    out += hex[i];
    i = x & 0x0f;
    out += hex[i];
  }
  return out;
}
export default bytesToHexString;
```

### reverseTwo

```ts
// 将输入字符串中的字符按照每两个字符一组进行反转，并在每组之间添加一个冒号 :
function reverseTwo(str) {
  var str1 = "";
  for (var i = 1; i <= str.length; i++) {
    str1 += str[i - 1];
    if (i % 2 == 0) {
      if (i == str.length) {
        break;
      }
      str1 += ":";
    }
  }
  var str2 = "";
  for (var i = str1.split(":").length - 1; i >= 0; i--) {
    str2 += str1.split(":")[i];
  }
  return str2;
}

export default reverseTwo;
```

### 读卡号

```ts
import useNfc from "@/hooks/useNfc";
const { initNFC, closeNFC, nfcType } = useNfc();
//初始化NFC
onLoad(() => {
  initNFC(function (cardNo) {
    const { data } = cardNo;
    if (cardNoNfc.value !== data.id) {
      cardNoNfc.value = data.id;
    } else {
      uni.showToast({
        title: "请勿重复刷卡",
        icon: "none",
      });
    }
  });
});
```
