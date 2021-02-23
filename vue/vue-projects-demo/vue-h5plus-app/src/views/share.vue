<template>
  <div>
    <p class="heading">分享图片：</p>
    <table style="width:100%;">
      <tbody>
        <!-- <tr>
          	<td style="width:30%"><div class="button button-select" onclick="imageCameraPicture()">拍照</div></td>
          <td style="width:30%"><div class="button button-select" onclick="imageGalleryPicture()">相册选取</div></td>
          <td style="width:30%">
            <div class="button button-select" @click="imageLogoPicture()">使用logo图</div>
          </td> 
        </tr>-->
        <tr>
          <td>
            <div id="canvas" ref="canvas"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <img id="image_picture" class="sharepicture" src="~assets/images/add.png" />
    <br />
    <div class="button" @click="shareImage()">分享图片</div>
    <hr color="#EEE" />
    <br />
    <br />
    <p class="heading">分享文本：</p>
    <textarea id="text_content" class="sharecontent" rows="3">我正在使用HBuilder开发移动应用，赶紧跟我一起来体验！</textarea>
    <div class="button" @click="shareText()">分享文本</div>
    <hr color="#EEE" />
    <br />
    <br />
    <p class="heading">分享网页：</p>
    <table style="width:100%;">
      <tbody>
        <tr>
          <td style="width:20%;text-align:right;font-size:12px;">网页地址</td>
          <td style="width:65%">
            <input
              id="web_href"
              class="share_input"
              type="url"
              value="http://www.qdi5.com/"
              placeholder="请输入要分享的网页地址"
            />
          </td>
        </tr>
        <tr>
          <td style="width:20%;text-align:right;font-size:12px;">网页标题</td>
          <td style="width:65%">
            <input
              id="web_title"
              class="share_input"
              type="url"
              value="前端爱我个人博客"
              placeholder="请输入要分享的网页地址"
            />
          </td>
        </tr>
        <tr>
          <td style="width:20%;text-align:right;font-size:12px;">网页描述</td>
          <td style="width:65%">
            <input
              id="web_content"
              class="share_input"
              type="url"
              value="我正在使用HBuilder+HTML5开发移动应用，赶紧跟我一起来体验！"
              placeholder="请输入要分享的网页描述"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="des">分享网页需要设置缩略图，否则可能会分享失败。</p>
    <div class="button" @click="shareWeb()">分享网页</div>
    <hr color="#EEE" />
    <br />
    <br />
  </div>
</template>

<script>
import h5plusReady from "common/js/h5plusReady.js";
import QRcode from "common/js/qrcode.js";
var shares = null;
var sweixin = null;
var buttons = [
  { title: "我的好友", extra: { scene: "WXSceneSession" } },
  { title: "朋友圈", extra: { scene: "WXSceneTimeline" } },
  { title: "我的收藏", extra: { scene: "WXSceneFavorite" } }
];
// 分享
function share(srv, msg, button) {
  console.log("分享操作：");
  if (!srv) {
    console.log("无效的分享服务！");
    return;
  }
  button && (msg.extra = button.extra);
  // 发送分享
  if (srv.authenticated) {
    console.log("---已授权---");
    doShare(srv, msg);
  } else {
    console.log("---未授权---");
    srv.authorize(
      function() {
        doShare(srv, msg);
      },
      function(e) {
        console.log("认证授权失败：" + JSON.stringify(e));
      }
    );
  }
}
// 发送分享
function doShare(srv, msg) {
  console.log(JSON.stringify(msg));
  srv.send(
    msg,
    function() {
      console.log('分享到"' + srv.description + '"成功！');
    },
    function(e) {
      console.log('分享到"' + srv.description + '"失败: ' + JSON.stringify(e));
    }
  );
}
function updateSerivces(plus) {
  plus.share.getServices(
    function(s) {
      shares = {};
      for (var i in s) {
        var t = s[i];
        shares[t.id] = t;
      }
      sweixin = shares["weixin"];
    },
    function(e) {
      console.log("获取分享服务列表失败：" + e.message);
    }
  );
}
// 分享图片
function shareImage() {
  debugger;
  var msg = { type: "image" };
  var canvas = this.$refs["canvas"];
  var img = canvas.querySelector("img");
  var url = "https://i.loli.net/2020/01/04/oPk8Qv4DKdClHSg.png";
  image_picture.src = url;
  image_picture.realUrl = url;
  if (!image_picture.realUrl) {
    plus.nativeUI.alert("请选择要分享的图片!");
    return;
  }
  msg.pictures = [image_picture.realUrl];
  sweixin
    ? plus.nativeUI.actionSheet(
        { title: "分享图片到微信", cancel: "取消", buttons: buttons },
        function(e) {
          e.index > 0 && share(sweixin, msg, buttons[e.index - 1]);
        }
      )
    : plus.nativeUI.alert("当前环境不支持微信分享操作!");
}

export default {
  beforeCreate() {
    h5plusReady(plus => {
      updateSerivces(plus);
    });
  },
  mounted() {
    this.QRcode = new QRcode(document.getElementById("canvas"), {
      text: "http://appwx.szwoku.com/#/login?uid=123456",
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRcode.CorrectLevel.H
    });
  },
  methods: {
    shareImage,
    shareText() {
      var msg = { type: "text", content: text_content.value };
      sweixin
        ? plus.nativeUI.actionSheet(
            { title: "分享文本到微信", cancel: "取消", buttons: buttons },
            function(e) {
              e.index > 0 && share(sweixin, msg, buttons[e.index - 1]);
            }
          )
        : plus.nativeUI.alert("当前环境不支持微信分享操作!");
    },
    // 分享网页
    shareWeb() {
      var msg = { type: "web", thumbs: ["_www/logo.png"] };
      if (!web_href.value) {
        plus.nativeUI.alert("请输入分享网页的链接地址!");
        web_href.focus();
        return;
      }
      msg.href = web_href.value;
      if (!web_title.value) {
        plus.nativeUI.alert("请输入分享网页的标题!");
        web_title.focus();
        return;
      }
      msg.title = web_title.value;
      if (!web_content.value) {
        plus.nativeUI.alert("请输入分享网页的描述!");
        web_content.focus();
        return;
      }
      msg.content = web_content.value;
      sweixin
        ? plus.nativeUI.actionSheet(
            { title: "分享网页到微信", cancel: "取消", buttons: buttons },
            function(e) {
              e.index > 0 && share(sweixin, msg, buttons[e.index - 1]);
            }
          )
        : plus.nativeUI.alert("当前环境不支持微信分享操作!");
    }
  }
};
</script>

<style>
</style>