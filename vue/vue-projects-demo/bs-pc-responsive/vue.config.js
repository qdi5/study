module.exports = {
  lintOnSave:false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/common/sass/global.scss";@import "@/common/sass/theme/custom-variables.scss";`
      }
    }
  }
}
