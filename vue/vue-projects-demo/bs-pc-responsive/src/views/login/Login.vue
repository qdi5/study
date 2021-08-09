<template>
  <div>
    <tb-header></tb-header>
    <div class="login-wrap">
      <div class="login">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <tb-footer></tb-footer>    
  </div>
</template>

<script>

export default {
  

}
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  min-height: 600px;
}
.login {
  position: relative;
  width: 420px;
  height: 500px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -210px;
  margin-top: -250px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
}

</style>