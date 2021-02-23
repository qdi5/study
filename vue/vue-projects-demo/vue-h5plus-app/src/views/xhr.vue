<template>
  <div class="xhr-wrapper">
    <br />
    <ul class="dlist">
      <li class="ditem" @click="xhrCreate();">发送请求</li>
      <li class="ditem" @click="xhrResponseHeader();">获取所有响应头</li>
      <li class="ditem" @click="xhrAbort();">取消请求</li>
    </ul>
    <div id="outpos" />
    <div id="output">XMLHttpRequest管理网络请求操作，可进行跨域网络数据请求。</div>
    <audio v-if="mp3url" :src="mp3url" preload autoplay></audio>
  </div>
</template>
<script>
import { h5plusMixins } from "common/mixins";

var url = "http://163.wuzhe.online/song/url?id=1361345889";
var xhr = null;

function xhrCreate() {
  let _this = this;
  if (xhr) {
    console.log("xhr请求已创建");
    return;
  }
  console.log("创建请求：");
  xhr = new plus.net.XMLHttpRequest();
  xhr.onreadystatechange = function() {
    switch (xhr.readyState) {
      case 0:
        console.log("xhr请求已初始化");
        break;
      case 1:
        console.log("xhr请求已打开");
        break;
      case 2:
        console.log("xhr请求已发送");
        break;
      case 3:
        console.log("xhr请求已响应");
        break;
      case 4:
        console.log("xhr请求已完成");
        if (xhr.status == 200) {
          let responseText = xhr.responseText;
          let jsonResult = null;
          try {
            jsonResult = JSON.parse(responseText);
            _this.mp3url = jsonResult.data[0].url;
          } catch (e) {
            jsonResult = {
              errorObj: e
            };
          }

          console.log(jsonResult);
        } else {
          console.log("xhr请求失败：" + xhr.status);
        }
        break;
      default:
        break;
    }
  };
  xhr.open("GET", url);
  xhr.send();
}
function xhrResponseHeader() {
  if (xhr) {
    if (xhr.readyState != 4) {
      console.log("xhr请求未完成");
    } else if (xhr.status != 200) {
      console.log("xhr请求失败：" + xhr.readyState);
    } else {
      console.log("xhr请求响应头数据：");
      console.log(xhr.getAllResponseHeaders());
    }
  } else {
    console.log("未发送请求");
  }
}
function xhrAbort() {
  if (xhr) {
    console.log("取消请求");
    if (xhr.readyState != 4) {
      xhr.abort();
    }
    xhr = null;
  } else {
    console.log("未发送请求");
  }
}
export default {
  mixins: [h5plusMixins],
  data() {
    return {
      mp3url: ""
    };
  },
  methods: {
    xhrCreate,
    xhrResponseHeader,
    xhrAbort
  }
};
</script>

