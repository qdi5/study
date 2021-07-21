module.exports = {
  lintOnSave:false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/common/sass/global.scss";@import "@/common/sass/theme/custom-variables.scss";`
      }
    }
  }
}
