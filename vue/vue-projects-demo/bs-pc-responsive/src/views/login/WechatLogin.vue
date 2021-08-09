<template>
  <div class="wechat-login">
    <!-- <h2 class="title">注册登录TradeBlazer</h2> -->
    <div class="public-code">
      <div class="wechat-code--wrapper">
        <div id="wechatContainer">
        </div>
      </div>
      <!-- <div class="wx-icon--wrapper">
        <i class="icon wx-icon"></i>
        <span>微信扫码</span>
      </div> -->
    </div>
    <div class="main-select">
        <router-link class="link" :to="{ name: 'LoginPwdOrPhone', query: { type: 'pwd' } }">账号密码登录</router-link>
        <router-link class="link" :to="{ name: 'LoginPwdOrPhone', query: { type: 'phone' } }">手机免密登录</router-link>
    </div>
    <load-remotejs jsUrl="//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js" :jsLoadedCb="jsLoadedCb"></load-remotejs>
  </div>
</template>

<script>
export default {
  methods: {
    jsLoadedCb () {
      console.log('js weixin 加载成功……')  
    },
    
    _initWeixin () {
      console.log('mounted')
      var obj = new WxLogin({ 
        id:"wechatContainer", 
        appid: "wx9ace824352d86965", 
        scope: "snsapi_login", 
        redirect_uri: "http://wechatcb.tbquant.net/",
        state: "",
        style: "",
        href: ""
      })
      console.log('obj:\r\n', obj)
    }
  },
  mounted() {
      debugger
      this._initWeixin()
    },
    activated () {
      debugger
      this._initWeixin()
    }
};
</script>

<style lang="scss" scoped>
.wechat-login {
  text-align: center;
  .title {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 24px;
    color: #3d3d3d;
    line-height: 30px;
  }
}
.wechat-code--wrapper {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-top: 26px;
}
.wx-icon--wrapper {
  & > span {
    vertical-align: middle;
    margin-top: 10px;
    color: #3d3d3d;
    font-size: 14px;
  }
}
.icon {
  display: inline-block;
  vertical-align: middle;
}
.wx-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  background: url("~@/assets/wx_icon.png") no-repeat;
  background-size: cover;
}
.main-select {
  position: absolute;
  bottom: 35px;
  width: 100%;
  color: #4184e1;
  .link {
    color: #4184e1;
    & + .link {
      margin-left: 15px;
      
    }
  }
}
</style>
