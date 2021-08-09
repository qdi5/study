<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <b-navbar-brand to="/" class="navbar-brand__self">
      <img :src="require('@/assets/TBforum_home_img_01.png')" alt="" class="logo">
      <!-- 仅仅在xs下隐藏文字 -->
      <span class="logo-name d-none d-sm-inline">TradeBlazer</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span>产品中心</span>
          </template>
          <b-dropdown-item href="#">TBQuant</b-dropdown-item>
          <b-dropdown-item href="#">TBSmart</b-dropdown-item>
          <b-dropdown-item href="#">TB宽客宝</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span>帮助中心</span>
          </template>
          <b-dropdown-item href="#">TBQuant软件使用</b-dropdown-item>
          <b-dropdown-item href="#">TBSmart软件使用</b-dropdown-item>
          <b-dropdown-item href="#">TB语言编程</b-dropdown-item>
          <b-dropdown-item href="#">函数</b-dropdown-item>
          <b-dropdown-item href="#">基础数据</b-dropdown-item>
          <b-dropdown-item href="#">Python</b-dropdown-item>
          <b-dropdown-item href="#">常见问题（FAQ）</b-dropdown-item>
          <b-dropdown-item href="#">TB宽客宝app操作指南</b-dropdown-item>
          <b-dropdown-item href="#">公式函数帮助文档</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#">社区</b-nav-item>
        <b-nav-item href="#">学习视频</b-nav-item>
        <b-nav-item href="#">商城</b-nav-item>
        <b-nav-item-dropdown>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span>下载</span>
          </template>
          <b-dropdown-item href="#">TBQuant</b-dropdown-item>
          <b-dropdown-item href="#">TBSmart</b-dropdown-item>
          <b-dropdown-item href="#">TB宽客宝</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span>最新动态</span>
          </template>
          <b-dropdown-item href="#">培训活动</b-dropdown-item>
          <b-dropdown-item href="#">公告</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->
        <b-nav-item v-if="!isLogin" right to="/login">登录/注册</b-nav-item>
        <b-nav-item-dropdown v-else right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">个人中心</b-dropdown-item>
          <b-dropdown-item href="#">退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { performance } from '@/common/js'
export default {
    name: 'TbHeader',
    data () {
      return {
        navTheme: 'dark',
        isLogin: false
      }
    },
    mounted () {
      const wrapHandle = performance.throttle(this.handleScrollEvent, 500)
      window.addEventListener('scroll', wrapHandle, false)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', wrapHandle, false)
      })
    },
    methods: {
      handleScrollEvent (e) {
        console.log(e)
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(`scrollTop: ${ scrollTop }`)
        if (scrollTop > 150) {
          if (this.navTheme !== 'dark') {
            this.navTheme = 'dark'
          }
        } else {
          if (this.navTheme !== 'light') {
            this.navTheme = 'light'
          }
        }      
      }
    }
}
</script>

<style lang="scss" scoped>
.navbar-brand__self {
  .logo {
    width: initial;
  }
  .logo-name {
    font-size: 30px;
    color: #fff;
    margin-left: 12px;
    font-weight: 600;
    vertical-align: middle;
  }
}

</style>