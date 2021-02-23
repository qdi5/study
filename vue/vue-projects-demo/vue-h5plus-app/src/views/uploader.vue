<template>
  <div class="h5plus-uploader">
    <br />
    <p class="heading">上传文件列表：</p>
    <ul id="files" style="text-align:left;">
      <p id="empty" style="font-size:12px;color:#C6C6C6;">无上传文件</p>
    </ul>
    <table style="width:100%;">
      <tbody>
        <tr>
          <td style="width:40%">
            <div class="button button-select" @click="appendByCamera()">拍照</div>
          </td>
          <td style="width:40%">
            <div class="button button-select" @click="appendByGallery()">相册选取</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="preview-wrapper">
      <img v-for="img in previewImgs" :src="img" alt :key="img" />
    </div>
    <br />
    <div class="button" @click="upload()">上 传</div>
    <br />
    <div id="outpos" />
    <div id="output">Uploader用于管理文件的上传，用于从本地上传各种文件到网络服务器，支持跨域访问操作。</div>
  </div>
</template>

<script>
var server = "http://192.168.1.168:3000/upload/multiple/any";
var files = [];

// 添加文件
var index = 1;
function appendFile(p) {
  debugger;
  var fe = document.getElementById("files");
  var li = document.createElement("li");
  var n = p.substr(p.lastIndexOf("/") + 1);
  li.innerText = n;
  fe.appendChild(li);
  files.push({ name: "file" + index, path: p });
  index++;
  empty.style.display = "none";
}

// 产生一个随机数
function getUid() {
  return Math.floor(Math.random() * 100000000 + 10000000).toString();
}
import h5plusReady from "common/js/h5plusReady.js";

export default {
  data() {
    return {
      previewImgs: []
    };
  },
  beforeCreate() {
    h5plusReady(plus => {
      window.plus = plus;
    });
  },
  methods: {
    // 拍照添加文件
    appendByCamera() {
      let _this = this;
      plus.camera.getCamera().captureImage(function(p) {
        _this.previewImgs.push(p);
        appendFile(p);
      });
    },
    // 从相册添加文件
    appendByGallery() {
      let _this = this;
      plus.gallery.pick(
        function(e) {
          _this.previewImgs = e.files;
          for (var i in e.files) {
            appendFile(e.files[i]);
            console.log("图片" + i + ":\n", e.files[i]);
          }
        },
        function() {
          console.log("取消选择图片");
        },
        {
          filter: "image",
          multiple: true,
          system: false
        }
      );
    },
    // 上传文件
    upload() {
      if (files.length <= 0) {
        plus.nativeUI.alert("没有添加上传文件！");
        return;
      }
      console.log("开始上传：");
      var wt = plus.nativeUI.showWaiting();
      // 新建上传任务
      var task = plus.uploader.createUpload(
        server,
        { method: "POST" },
        function(t, status) {
          //上传完成
          plus.nativeUI.closeWaiting();
          if (status == 200) {
            console.log("上传成功：" + t.responseText);
            // 应用本地数据存储；可在应用内跨域操作，数据存储期是持久化的，并且没有容量限制。
            plus.storage.setItem("uploader", t.responseText);
            // clicked('uploader_ret.html');
          } else {
            console.log("上传失败：" + status);
            wt.close();
          }
        }
      );
      task.addData("client", "HelloH5+");
      task.addData("uid", getUid());
      for (var i = 0; i < files.length; i++) {
        var f = files[i];
        task.addFile(f.path, { key: f.name });
      }
      task.start();
    }
  }
};
</script>

<style>
</style>