<template>
  <div class="downloader">
    <br />
    <ul class="dlist">
      <li class="ditem" @click="createDownloadTask()">创建下载任务</li>
      <li class="ditem" @click="startDownloadTask()">启动下载任务</li>
      <!--  <li class="ditem" @click="pauseDownloadTask()">暂停下载任务</li>
      <li class="ditem" @click="resumeDownloadTask()">恢复下载任务</li>
      <li class="ditem" @click="cancelDownloadTask()">取消下载任务</li>-->
      <!--<li class="ditem" @click="clearDownloadTask()">清除所有任务</li>-->
    </ul>
    <div id="outpos" />
    <div id="output">Downloader用于管理文件的下载，可从网络下载各种文件，并支持跨域访问。</div>
  </div>
</template>
<script>
import h5plusReady from "common/js/h5plusReady.js";

var dtask = null;
function createDownloadTask() {
  if (dtask) {
    console.log("下载任务已创建！");
    return;
  }
  var url =
    "http://su.sycdn.kuwo.cn/232eb26babad48867d4ecc88fd452f92/5dea52ea/resource/n1/67/60/1968075379.mp3";
  var options = { method: "GET" };
  dtask = plus.downloader.createDownload(url, options);
  dtask.addEventListener("statechanged", function(task, status) {
    if (!dtask) {
      return;
    }
    switch (task.state) {
      case 1: // 开始
        console.log("开始下载...");
        break;
      case 2: // 已连接到服务器
        console.log("链接到服务器...");
        break;
      case 3: // 已接收到数据
        console.log("下载数据更新:");
        console.log(task.downloadedSize + "/" + task.totalSize);
        break;
      case 4: // 下载完成
        console.log("下载完成！");
        console.log(task.totalSize);
        break;
    }
  });
  console.log("创建下载任务成功！");
}
function startDownloadTask() {
  if (!dtask) {
    console.log("请先创建下载任务！");
    return;
  }
  dtask.start();
}
// 暂停下载任务
function pauseDownloadTask() {
  dtask.pause();
  console.log("暂停下载！");
}
// 恢复下载任务
function resumeDownloadTask() {
  dtask.resume();
  console.log("恢复下载！");
}
function cancelDownloadTask() {
  dtask.abort();
  dtask = null;
  console.log("取消下载任务！");
}
function clearDownloadTask() {}
function startAll() {
  plus.downloader.startAll();
}

export default {
  data() {
    return {
      location: ""
    };
  },

  mounted() {
    let _this = this;
    h5plusReady(function(plus) {});
  },
  methods: {
    createDownloadTask,
    startDownloadTask
  }
};
</script>

