<template>
  <div class="payment-wrapper">
    <br />
    <p id="info" style="padding: 0 1em;text-align:left;" v-if="channels && channels.length">
      支付通道信息：
      <template
        v-for="channel in channels"
      >{{ `id:${channel.id},description:${channel.description},serviceReady:${channel.serviceReady};` }}</template>
    </p>
    <div style="padding: 0.5em 1em;">
      <hr color="#EEE" />
    </div>
    <p style="padding: 0 1em;text-align:left;">为DCloud提供的免费软件进行赞助吧。</p>
    <br />
    <div style="padding: 0 1em;text-align:left">
      捐赠金额：
      <input id="total" type="number" value="1" /> 元
    </div>
    <br />
    <div id="payment" v-if="channels && channels.length">
      <template v-for="(channel,index) in channels">
        <div
          class="button"
          v-if="channel.id !=='qhpay' && channel.id !=='qihoo'"
          @click="pay()"
          :key="index"
        >{{ channel.description + "支付" }}</div>
      </template>
    </div>

    <div id="outpos" />
    <div id="output">Payment模块管理支付功能，可通过js调用第三方支付服务。通过plus.payment可获取支付管理对象。</div>
  </div>
</template>

<script>
import { h5plusMixins } from "common/mixins";
var w = null;
export default {
  mixins: [h5plusMixins],
  data() {
    return { channels: null };
  },
  mounted() {
    this.getPaymentChannels();
  },
  methods: {
    // 获取支付通道
    getPaymentChannels() {
      let _this = this;
      plus.payment.getChannels(
        function(channels) {
          _this.channels = channels;
        },
        function(e) {
          console.log("获取支付通道失败：" + e.message);
        }
      );
    },
    // 支付
    pay(id) {
      if (w) {
        return;
      } //检查是否请求订单中
      if (id === "appleiap") {
        console.log("应用内支付");
        // clicked("payment_iap.html");
        return;
      }
      console.log("----- 请求支付 -----");
      var url = PAYSERVER;
      if (id == "alipay" || id == "wxpay") {
        url += id;
      } else {
        plus.nativeUI.alert("当前环境不支持此支付通道！", null, "捐赠");
        return;
      }
      var appid = plus.runtime.appid;
      if (navigator.userAgent.indexOf("StreamApp") >= 0) {
        appid = "Stream";
      }
      url += "&appid=" + appid + "&total=";

      w = plus.nativeUI.showWaiting();
      // 请求支付订单
      var amount = document.getElementById("total").value;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
          case 4:
            w.close();
            w = null;
            if (xhr.status == 200) {
              console.log("----- 请求订单成功 -----");
              console.log(xhr.responseText);
              var order = xhr.responseText;
              plus.payment.request(
                _this.pays[id],
                order,
                function(result) {
                  console.log("----- 支付成功 -----");
                  console.log(JSON.stringify(result));
                  plus.nativeUI.alert(
                    "支付成功：感谢你的支持，我们会继续努力完善产品。",
                    function() {
                      back();
                    },
                    "捐赠"
                  );
                },
                function(e) {
                  console.log("----- 支付失败 -----");
                  console.log("[" + e.code + "]：" + e.message);
                  plus.nativeUI.alert(
                    "更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html",
                    null,
                    "支付失败：" + e.code
                  );
                }
              );
            } else {
              console.log("----- 请求订单失败 -----");
              console.log(xhr.status);
              plus.nativeUI.alert("获取订单信息失败！", null, "捐赠");
            }
            break;
          default:
            break;
        }
      };
      xhr.open("GET", url + amount);
      console.log("请求支付订单：" + url + amount);
      xhr.send();
    },
    // 检测是否安装支付服务
    checkServices(pc) {
      if (!pc.serviceReady) {
        var txt = null;
        switch (pc.id) {
          case "alipay":
            txt =
              "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
            break;
          default:
            txt =
              "系统未安装“" +
              pc.description +
              "”服务，无法完成支付，是否立即安装？";
            break;
        }
        plus.nativeUI.confirm(
          txt,
          function(e) {
            if (e.index == 0) {
              pc.installService();
            }
          },
          pc.description
        );
      }
    }
  },
  computed: {
    pays() {
      return this.channels.map(channel => ({ [channel.id]: channel }));
    }
  },
  watch: {
    channels(newValue, oldValue) {
      if (Array.isArray(newValue) && newValue.length) {
        newValue.forEach(channel => {
          this.checkServices(channel);
        });
      }
    }
  }
};
// var pays = {};
/*function getPaymentChannels() {
  // 获取支付通道
  plus.payment.getChannels(
    function(channels) {
      // var content = document.getElementById("payment");
      // var info = document.getElementById("info");
      // var txt = "支付通道信息：";
      // for (var i in channels) {
      // var channel = channels[i];
      /*  if (channel.id == "qhpay" || channel.id == "qihoo") {
          // 过滤掉不支持的支付通道：暂不支持360相关支付
          continue;
        } */
// pays[channel.id] = channel;
/* txt += "id:" + channel.id + ", ";
        txt += "description:" + channel.description + ", ";
        txt += "serviceReady:" + channel.serviceReady + "； "; 
      /* var de = document.createElement("div");
        de.setAttribute("class", "button");
        de.setAttribute("onclick", "pay(this.id)");
        de.id = channel.id;
        de.innerText = channel.description + "支付"; 
        content.appendChild(de);
      // checkServices(channel);
      // }
      // info.innerText = txt;
    },
    function(e) {
      console.log("获取支付通道失败：" + e.message);
    }
  );
} */

// 检测是否安装支付服务
/* function checkServices(pc) {
  if (!pc.serviceReady) {
    var txt = null;
    switch (pc.id) {
      case "alipay":
        txt =
          "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
        break;
      default:
        txt =
          "系统未安装“" +
          pc.description +
          "”服务，无法完成支付，是否立即安装？";
        break;
    }
    plus.nativeUI.confirm(
      txt,
      function(e) {
        if (e.index == 0) {
          pc.installService();
        }
      },
      pc.description
    );
  }
} */

var w = null;
var PAYSERVER = "http://demo.dcloud.net.cn/payment/?payid=";

// 支付
function pay(id) {
  let _this = this;
  if (w) {
    return;
  } //检查是否请求订单中
  if (id === "appleiap") {
    console.log("应用内支付");
    clicked("payment_iap.html");
    return;
  }
  console.log("----- 请求支付 -----");
  var url = PAYSERVER;
  if (id == "alipay" || id == "wxpay") {
    url += id;
  } else {
    plus.nativeUI.alert("当前环境不支持此支付通道！", null, "捐赠");
    return;
  }
  var appid = plus.runtime.appid;
  if (navigator.userAgent.indexOf("StreamApp") >= 0) {
    appid = "Stream";
  }
  url += "&appid=" + appid + "&total=";

  w = plus.nativeUI.showWaiting();
  // 请求支付订单
  var amount = document.getElementById("total").value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    switch (xhr.readyState) {
      case 4:
        w.close();
        w = null;
        if (xhr.status == 200) {
          console.log("----- 请求订单成功 -----");
          console.log(xhr.responseText);
          var order = xhr.responseText;
          plus.payment.request(
            _this.pays[id],
            order,
            function(result) {
              console.log("----- 支付成功 -----");
              console.log(JSON.stringify(result));
              plus.nativeUI.alert(
                "支付成功：感谢你的支持，我们会继续努力完善产品。",
                function() {
                  back();
                },
                "捐赠"
              );
            },
            function(e) {
              console.log("----- 支付失败 -----");
              console.log("[" + e.code + "]：" + e.message);
              plus.nativeUI.alert(
                "更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html",
                null,
                "支付失败：" + e.code
              );
            }
          );
        } else {
          console.log("----- 请求订单失败 -----");
          console.log(xhr.status);
          plus.nativeUI.alert("获取订单信息失败！", null, "捐赠");
        }
        break;
      default:
        break;
    }
  };
  xhr.open("GET", url + amount);
  console.log("请求支付订单：" + url + amount);
  xhr.send();
}
</script>

<style>
</style>