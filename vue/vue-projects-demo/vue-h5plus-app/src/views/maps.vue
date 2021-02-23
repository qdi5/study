<template>
  <div class="maps-wrapper">
    <br />
    <div class="button" @click="navigateWithMap()">调用第三方地图程序导航</div>
    <div class="button" @click="showMaps()">应用内置地图</div>
    <div id="outpos" />
    <div id="output">Maps模块管理地图控件，用于在web页面中显示地图控件，提供各种接口操作地图控件，如添加标点、路线等。通过plus.maps可获取地图管理对象。</div>
    <transition name="slide-left">
      <maps-map v-if="isShow"></maps-map>
    </transition>
  </div>
</template>

<script>
import { h5plusMixins } from "common/mixins";
import MapsMap from "components/maps-map/maps-map.vue";
function navigateWithMap() {
  // 设置目标位置坐标点和起始位置坐标点
  // Point(经度，纬度)
  // 地图元素的坐标
  var dst = new plus.maps.Point(
    this.location.longitude,
    this.location.latitude
  ); // 使用手机GPS获取经纬度
  var src = new plus.maps.Point(116.335, 39.966); // 大钟寺
  // 调用系统地图进行导航
  plus.maps.openSysMap(dst, "天安门", src);
}

export default {
  mixins: [h5plusMixins],
  data() {
    return {
      isShow: false,
      channels: null,
      location: {
        // 经度
        longitude: 0,
        // 纬度
        latitude: 0
      }
    };
  },
  async mounted() {
    let location = await this.getLocation();
    console.log("GPS获取到的经纬度：");
    console.log(location);
    this.location = location;
  },
  methods: {
    navigateWithMap,
    getLocation() {
      return new Promise(function(resolve, reject) {
        plus.geolocation.getCurrentPosition(
          function({ coords, addresses, coordsType }) {
            let location = {
              longitude: coords.longitude,
              latitude: coords.latitude,
              addresses,
              coordsType
            };
            resolve(location);
          },
          function(e) {
            reject({
              error: e.message,
              msg: "获取位置信息失败"
            });
          },
          {
            provider: "baidu", // 设置获取的坐标系类型为百度
            coordsType: "bd09ll", // 具体的坐标系名称
            geocode: true // 允许获取地址
          }
        );
      });
    },
    showMaps() {
      this.isShow = true;
    }
  },
  components: {
    MapsMap
  }
};
</script>

<style>
</style>