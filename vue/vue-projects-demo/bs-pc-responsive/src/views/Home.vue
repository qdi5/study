<template>
  <div>
    <tb-header></tb-header>
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
    }
  }
</script>
<style lang="scss" scoped>

</style>
