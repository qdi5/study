<template>
  <div id="bcid" style="background: red;">
    <div style="height:40%"></div>
    <p class="tip">...载入中...</p>
  </div>
</template>

<script>
import { h5plusMixins } from "common/mixins";
var ws = null,
  wo = null;
var scan = null;

// 二维码扫描成功
function onmarked(type, result, file) {
  switch (type) {
    case plus.barcode.QR:
      type = "QR";
      break;
    case plus.barcode.EAN13:
      type = "EAN13";
      break;
    case plus.barcode.EAN8:
      type = "EAN8";
      break;
    default:
      type = "其它" + type;
      break;
  }
  result = result.replace(/\r\n/g, "");
  console.log(type + "," + result + "," + file);
  console.log("二维码扫描成功的this:", this);
  this.$emit("scanResult", {
    type,
    result,
    file
  });
  this.$emit("close");
  console.log("关闭扫描窗口……");
  scan.close();
}

// 从相册中选择二维码图片
function scanPicture() {
  plus.gallery.pick(
    function(path) {
      plus.barcode.scan(path, onmarked, function(error) {
        plus.nativeUI.alert("无法识别此图片");
      });
    },
    function(err) {
      console.log("Failed: " + err.message);
    }
  );
}
export default {
  mixins: [h5plusMixins],
  mounted() {
    // 如果this.plus不存在，则等待plus的存在，调用starScan
    // while (!window.plus) {}
    // console.log("死循环结束");
    this.startScan();
  },
  methods: {
    // 开始扫描
    startScan() {
      // 查找id为bcid的DOM标签节点，设置扫码识别控件的位置和大小与其保持一致
      console.log("开始扫码了……");
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked.bind(this);
      scan.start({ conserve: true, filename: "_doc/barcode/" });
    }
  }
};
</script>
<style lang="stylus" scoped>
#bcid {
  width: 100%;
  position: fixed;
  top: 0px;
  bottom: 0px;
  text-align: center;
}

.tip {
  color: #FFFFFF;
  font-weight: bold;
  text-shadow: 0px -1px #103E5C;
}
</style>