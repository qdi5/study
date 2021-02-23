<template>
  <div class="barcode-wrapper">
    <br />
    <img style="width:40%" id="bimg" :src="imgUrl" />
    <br />
    <div class="button" @click="openBarcode()">扫一扫</div>
    <div class="button" @click="openBarcodeCustom()">扫一扫（自定义）</div>
    <transition name="slide-left">
      <barcode-scan v-if="isShow" @scanResult="scanResult" @close="close"></barcode-scan>
    </transition>
  </div>
</template>
<script>
import BarcodeScan from "components/barcode-scan/barcode-scan.vue";

let defaultImg = require("assets/images/barcode.png");
export default {
  data() {
    return {
      imgUrl: defaultImg,
      isShow: false
    };
  },
  plusReady: function(plus) {
    debugger;
    console.log("vue instance plus: ", plus);
  },
  methods: {
    openBarcode() {
      this.isShow = true;
    },
    openBarcodeCustom() {},
    close() {
      this.isShow = false;
    },
    scanResult({ type, result, file }) {
      console.log("触发了scan-result:", file);
      if (!file || file == "null") {
        this.imgUrl = defaultImg;
      } else {
        plus.io.resolveLocalFileSystemURL(file, entry => {
          this.imgUrl = entry.toLocalURL();
        });
      }
    }
  },
  components: {
    BarcodeScan
  }
};
</script>

