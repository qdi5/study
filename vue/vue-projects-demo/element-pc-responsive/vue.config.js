module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/common/sass/global.scss";`
      }
    }
  }
}
