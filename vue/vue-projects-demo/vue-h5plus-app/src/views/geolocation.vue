<template>
  <div>{{ location || '定位啦' }}</div>
</template>
<script>
import h5plusReady from "common/js/h5plusReady.js";
function geoInf(position) {
  var str = "";
  str += "地址：" + position.addresses + "\n"; //获取地址信息
  str += "坐标类型：" + position.coordsType + "\n";
  var timeflag = position.timestamp; //获取到地理位置信息的时间戳；一个毫秒数；
  str += "时间戳：" + timeflag + "\n";
  var codns = position.coords; //获取地理坐标信息；
  var lat = codns.latitude; //获取到当前位置的纬度；
  str += "纬度：" + lat + "\n";
  var longt = codns.longitude; //获取到当前位置的经度
  str += "经度：" + longt + "\n";
  var alt = codns.altitude; //获取到当前位置的海拔信息；
  str += "海拔：" + alt + "\n";
  var accu = codns.accuracy; //地理坐标信息精确度信息；
  str += "精确度：" + accu + "\n";
  var altAcc = codns.altitudeAccuracy; //获取海拔信息的精确度；
  str += "海拔精确度：" + altAcc + "\n";
  var head = codns.heading; //获取设备的移动方向；
  str += "移动方向：" + head + "\n";
  var sped = codns.speed; //获取设备的移动速度；
  str += "移动速度：" + sped;
  console.log(JSON.stringify(position));
  return str;
}

export default {
  data() {
    return {
      location: ""
    };
  },
  mounted() {
    let _this = this;
    h5plusReady(function(plus) {
      console.log("app plus:", plus);
      plus.geolocation.getCurrentPosition(
        function(position) {
          _this.location = geoInf(position);
        },
        function(e) {
          alert("获取位置信息失败：" + e.message);
        },
        { geocode: true }
      );
    });
  }
};
</script>

