<template>
  <div>
    <tb-header></tb-header>
    <router-link :to="{name: 'About'}">about</router-link>
    <tb-footer></tb-footer>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
    data() {
      return {
        activeIndex: '1',
        activeName: 'second',
        dialogVisible: false
      };
    },
    
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      }
    },
    mounted () {
      debugger
      if(window.name == ""){
   console.log("首次被加载");
   window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值 
   }else if(window.name == "isReload"){
   console.log("页面被刷新");
   }
    }
  }
</script>
<style lang="scss" scoped>

</style>
