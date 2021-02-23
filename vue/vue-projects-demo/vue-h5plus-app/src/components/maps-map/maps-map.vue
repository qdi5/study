<template>
  <div class="maps-map-wrapper">
    <div @click="showChild">打开子组件</div>
    <transition name="slide-left">
      <test v-if="isShowChild" @close="closeChild"></test>
    </transition>
    <div class="map" id="map">地图加载中...</div>

    <div class="icon-center-point">
      <span class="iconfont icon-locationon"></span>
    </div>
  </div>
</template>

<script>
import Test from "components/maps-map/test.vue";
var ws = null,
  wo = null;
var em = null,
  map = null,
  pcenter = null,
  marker = null;
function createMarker() {
  // 创建地图标点Marker对象
  marker = new plus.maps.Marker(
    new plus.maps.Point(this.longitude, this.latitude)
  );
  // 设置标点上显示的图标
  marker.setIcon("/images/logo.png");
  // 设置标点上显示的文本标注
  marker.setLabel("HBuilder");
  // 创建气泡对象
  var bubble = new plus.maps.Bubble("打造最好的HTML5移动开发工具");
  // 设置标点的气泡内容
  marker.setBubble(bubble);
  // 设置标点允许拖拽
  marker.setDraggable(true);
  // 向地图中添加覆盖物
  map.addOverlay(marker);
}
function resetMap() {
  map.reset();
}
export default {
  data() {
    return {
      longitude: 0,
      latitude: 0,
      isShowChild: false
    };
  },
  async mounted() {
    let _this = this;
    let { longitude, latitude } = await this.getLocation();
    console.log("高德地图坐标：");
    console.log(longitude);
    console.log(latitude);
    this.longitude = longitude;
    this.latitude = latitude;
    pcenter = new plus.maps.Point(longitude, latitude);
    setTimeout(function() {
      // 创建Map对象
      map = new plus.maps.Map("map");
      // 设置地图初始中心点和缩放级别
      map.centerAndZoom(pcenter, 12);
      createMarker.call(_this);
      // 监听地图状态变化
      map.onstatuschanged = function(event) {
        var target = event.target; // 状态变化的地图对象(plus.maps.Map)
        var bounds = event.bounds; // 地图的可视地理区域(plus.maps.Bounds)
        var center = event.center; // 地图的中心点坐标(plus.maps.Point)
        var zoom = event.zoom;
        console.log("地图状态变化了，获取中心点：");
        console.log(JSON.stringify(center));
        marker.setPoint(new plus.maps.Point(center.longitude, center.latitude));
      };
      map.onclick = function(overlay) {
        console.log("点击覆盖物了");
      };
      // 创建子窗口
      // createSubview();
    }, 300);
  },
  methods: {
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
            provider: "amap",
            geocode: true
          }
        );
      });
    },
    resetMap,
    showChild() {
      this.isShowChild = true;
    },
    closeChild() {
      this.isShowChild = false;
    }
  },
  components: {
    Test
  }
};
</script>

<style lang="stylus" scoped>
.maps-map-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  z-index: 6668;
}

#map {
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;
  line-height: 200px;
  text-align: center;
  z-index: 0;
}

.icon-center-point {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 6669;
  color: red;
}
</style>