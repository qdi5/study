<template>
  <div class="camera-wrapper">
    <br />
    <div class="button" @click="getImage()">拍照</div>
    <div class="button" @click="getVideo()">录像</div>
    <br />
    <!-- History list -->
    <ul id="history" class="dlist" style="text-align:left;">
      <li id="empty" class="ditem-empty">无历史记录</li>
    </ul>
    <br />
    <div class="button button-waring" onclick="cleanHistory()">清空历史记录</div>
    <br />
    <div id="outpos" />
    <div id="output">Camera管理摄像头设备，可用于拍摄照片、录制视频文件。</div>
  </div>
</template>

<script>
import { h5plusMixins } from "common/mixins";
var i = 1,
  gentry = null,
  w = null;

// 拍照
function getImage() {
  console.log("开始拍照：");
  var cmr = plus.camera.getCamera();
  cmr.captureImage(
    function(p) {
      console.log("成功：" + p);
      plus.io.resolveLocalFileSystemURL(
        p,
        function(entry) {
          console.log("拍照成功回调……");
          console.log(entry);
          // createItem(entry);
        },
        function(e) {
          console.log("读取拍照文件错误：" + e.message);
        }
      );
    },
    function(e) {
      console.log("失败：" + e.message);
    },
    { filename: "_doc/camera/", index: 1 }
  );
}

// 录像
function getVideo() {
  console.log("开始录像：");
  var cmr = plus.camera.getCamera();
  cmr.startVideoCapture(
    function(p) {
      console.log("成功：" + p);
      plus.io.resolveLocalFileSystemURL(
        p,
        function(entry) {
          console.log("录像成功回调……");
          console.log(entry);
        },
        function(e) {
          console.log("读取录像文件错误：" + e.message);
        }
      );
    },
    function(e) {
      console.log("失败：" + e.message);
    },
    { filename: "_doc/camera/", index: i }
  );
}
export default {
  mixins: [h5plusMixins],
  data() {
    return { channels: null };
  },
  mounted() {
    this.getCameraDirectoryObj();
  },
  methods: {
    // 获取摄像头目录对象
    getCameraDirectoryObj() {
      plus.io.resolveLocalFileSystemURL(
        "_doc/",
        function(entry) {
          entry.getDirectory(
            "camera",
            { create: true },
            function(dir) {
              gentry = dir;
              // updateHistory();
            },
            function(e) {
              console.log('Get directory "camera" failed: ' + e.message);
            }
          );
        },
        function(e) {
          console.log('Resolve "_doc/" failed: ' + e.message);
        }
      );
    },
    getImage,
    getVideo
  }
};
</script>

<style>
</style>