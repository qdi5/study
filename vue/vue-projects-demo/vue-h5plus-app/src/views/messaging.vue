<template>
  <div class="messaging-wrapper">
    <br />
    <ul class="dlist">
      <li class="ditem">
        <a style="text-decoration:none;color:#666;display:block" href="sms:18588750850">发送短信</a>
      </li>
      <li class="ditem">
        <a style="text-decoration:none;color:#666;display:block" href="tel:18588750850">拨打电话</a>
      </li>
      <li class="ditem">
        <a
          style="text-decoration:none;color:#666;display:block"
          href="mailto:wuzhe_@aliyun.com"
        >发送邮件</a>
      </li>
    </ul>
    <div id="outpos" />
    <div id="output">Messaging管理设备通讯功能，可用于发送短信、彩信、邮件等。</div>
  </div>
</template>

<script>
import { h5plusMixins } from "common/mixins";

export default {
  mixins: [h5plusMixins],
  data() {
    return { channels: null };
  },
  methods: {
    addachmentMail() {
      console.log("发送带附件邮件：");
      var msg = plus.messaging.createMessage(plus.messaging.TYPE_EMAIL);
      msg.to = ["service@dcloud.io"];
      msg.body = "This is an example mail";
      msg.addAttachment("_www/img/helloh5.jpg");
      plus.messaging.sendMessage(msg);
    },
    htmlMail() {
      console.log("发送HTML邮件：");
      if (plus.os.name == "iOS") {
        var msg = plus.messaging.createMessage(plus.messaging.TYPE_EMAIL);
        msg.to = ["service@dcloud.io"];
        msg.body =
          '<!DOCTYPE HTML><html><head><meta charset="utf-8"/></head><body><h1>Hello</h1>This is an HTML content mail.</body></html>';
        msg.bodyType = "html";
        plus.messaging.sendMessage(msg);
        console.log("支持");
      } else {
        console.log("此平台不支持发送HTML邮件功能！");
        plus.nativeUI.alert("此平台不支持发送HTML邮件功能！");
      }
    },
    slientSMS() {
      console.log("后台发送短信：");
      if (plus.os.name == "Android") {
        var bts = ["发送到10086", "发送到10010", "发送到10000"];
        plus.nativeUI.prompt(
          "短信内容",
          function(e) {
            var to = null;
            switch (e.index) {
              case 0:
                to = ["10086"];
                break;
              case 1:
                to = ["10086"];
                break;
              case 2:
                to = ["10086"];
                break;
              default:
                return;
                break;
            }
            var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
            msg.to = to;
            msg.body = e.value;
            msg.silent = true;
            plus.messaging.sendMessage(msg);
            console.log('"' + e.value + '"' + bts[e.index]);
          },
          "发送短信",
          "CXYE",
          bts
        );
      } else {
        console.log("此平台不支持后台发送短信功能！");
        plus.nativeUI.alert("此平台不支持后台发送短信功能！");
      }
    }
  }
};
</script>

<style>
</style>