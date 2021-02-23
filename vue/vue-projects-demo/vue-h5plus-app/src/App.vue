<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link tag="span" to="/share">分享</router-link>|
        <router-link tag="span" to="/uploader">上传</router-link>|
        <router-link tag="span" to="/geolocation">定位</router-link>|
        <router-link tag="span" to="/downloader">下载</router-link>|
        <router-link tag="span" to="/xhr">ajax</router-link>|
        <router-link tag="span" to="/barcode">扫描</router-link>|
      </div>
      <div>
        <router-link tag="span" to="/payment">支付</router-link>|
        <router-link tag="span" to="/messaging">设备通讯</router-link>|
        <router-link tag="span" to="/camera">摄像头</router-link>|
        <router-link tag="span" to="/maps">地图</router-link>|
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data: () => ({}),
  plusReady(plus) {
    console.log("这里的this是：");
    console.log(this);
    plus.device.getInfo({
      success: function(e) {
        console.log("getDeviceInfo success: " + JSON.stringify(e));
      },
      fail: function(e) {
        console.log("getDeviceInfo failed: " + JSON.stringify(e));
      }
    });
  }
};
</script>
<style lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;
}

#nav {
  position: relative;
  top: 0;

  span {
    display: inline-block;
    padding: 5px 10px;
  }
}
</style>


