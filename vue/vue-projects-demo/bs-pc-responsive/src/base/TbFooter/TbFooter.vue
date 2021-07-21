<template>
  <footer class="footer">
    <div class="main">
      <b-container>
        <b-row align-h="between">
          <b-col cols="12" md="12" lg="6" xl="5" class="footer-left">
            <b-row>
              <b-col class="attach">
                <span class="about-title">关于</span>
                <ul>
                  <li>
                    <a
                      href="http://www.tb18.net/site/aboutus.html"
                      target="_blank"
                      >关于我们</a
                    >
                  </li>
                  <li>
                    <a
                      href="http://www.tb18.net/site/contact.html"
                      target="_blank"
                      >联系我们</a
                    >
                  </li>
                  <li>
                    <a
                      href="http://www.tb18.net/site/disclaimer.html"
                      target="_blank"
                      >免责声明</a
                    >
                  </li>
                </ul>
              </b-col>
              <b-col class="attach">
                <span class="about-title">旗下网站</span>
                <ul>
                  <li>
                    <a href="http://www.tradeblazer.net/" target="_blank"
                      >交易开拓者</a
                    >
                  </li>
                  <li>
                    <a href="http://www.tb18.net/" target="_blank"
                      >开拓者量化网</a
                    >
                  </li>
                </ul>
              </b-col>
              <b-col class="attach">
                <span class="about-title">商务合作</span>
                <ul>
                  <li>
                    <a
                      href="http://www.tradeblazer.net/site/partners.html"
                      target="_blank"
                      >合作伙伴</a
                    >
                  </li>
                  <li>
                    <a
                      href="http://www.tbquant.net/traffic.html"
                      target="_blank"
                      >第一创业开户</a
                    >
                  </li>
                </ul>
              </b-col>
            </b-row>
          </b-col>
          <b-col  cols="12" md="12" lg="6" xl="5">
            <b-row align-h="between" class="qrcode__wrap--center">
              <b-col cols="8" sm="6" md="5">
                <div class="qr">
                  <img src="./TBforum_home_img_12.png" alt="" />
                  <p class="text-center">微博：交易开拓者</p>
                </div>
              </b-col>
              <b-col cols="8" sm="6" md="5">
                 <div class="qr">
                    <img src="./TBforum_home_img_13.png" alt="" />
                    <p class="text-center">微信：开拓者量化网</p>
                  </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <div class="rights">
          <p class="rights__text text-center" pa10>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              class="color_light_text"
              >粤ICP备07044698号</a
            >
            © 2021 深圳开拓者科技有限公司. All Rights Reserved 版权所有 未经许可
            请勿转载
            <a
              href="https://szcert.ebs.org.cn/bd28168d-2ba5-44b0-ac1f-07eff21e3ebd"
              target="_blank"
            >
              <img
                class="rights__govicon"
                src="./govIcon.gif"
                title="深圳市市场监督管理局企业主体身份公示"
                alt="深圳市市场监督管理局企业主体身份公示"
                style="border-width: 0px; border: hidden; border: none"
              />
            </a>
          </p>
        </div>
      </b-container>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TbFooter",
};
</script>

<style lang="scss" scoped>
.qr {
  display: inline-block;
  height: 270px;
  img {
    width: 225px;
    height: 225px;
  }
  @media screen and (max-width: $sm-bks) {
    display: block;
    text-align: center;
  }
}
.about-title {
  display: inline-block;
  height: 46px;
  margin-bottom: 20px;
  border-bottom: 2px solid #fff;
}
.rights__govicon {
  width: 19px;
  height: auto;
}
.attach {
  font-size: 24px;
  a {
    font-size: 20px;
    color: #fff;
    line-height: 44px;
    opacity: 0.8;
    text-decoration: none;
    &:hover {
      opacity: 1;
    }
    @media screen and (max-width: $sm-bks) {
      font-size: 14px;
    }
  }
  @media screen and (max-width: $sm-bks) {
    font-size: 18px;
  }
}
.qrcode__wrap--center {
  @media screen and (max-width: $sm-bks) {
    justify-content: center!important;
  }
}
.rights {
  margin-top: 20px;
  .rights__text {
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        color: #777;
      }
    }
    font-size: 16px;
  }
}

.footer {
  width: 100%;
  min-height: 420px;
  background: #021a2c;
  padding-top: 80px;
  color: #fff;
}
</style>
