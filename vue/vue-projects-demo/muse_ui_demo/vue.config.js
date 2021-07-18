const CompressionPlugin = require('compression-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  publicPath: "/",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。也可以返回一个被克隆或合并过的配置版本
  configureWebpack: config => {
    //生产and测试环境
    let pluginsPro = [
      new CompressionPlugin({
        //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
        threshold: 8192,
        minRatio: 0.8
      }),
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin()
    ];

    //开发环境
    let pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: false // 发布代码前记得改回 false
      })
    ];

    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  },
  css: {
    loaderOptions: {
      css: {
        localIdentName: "[name]-[hash]",
        camelCase: "only"
      }
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 7006, // 端口号
    disableHostCheck: true,
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    hotOnly: true, // 热更新
    proxy: {
      //配置自动启动浏览器
      "/api": {
        target: "http://192.168.1.120:8001",
        changeOrigin: true,
        ws: false,
        secure: false
      },
      "/music": {
        target: "http://163.wuzhe.online",
        changeOrigin: true,
        ws: false,
        secure: false,
        pathRewrite: { "^/music": "" }
      },
      "/login": {
        target: "http://blog.wuzhe.online",
        changeOrigin: true,
        ws: false,
        secure: false
      },
      "/blog": {
        target: "http://api.wuzhe.online",
        changeOrigin: true,
        ws: false,
        secure: false,
        pathRewrite: { "^/blog": "" }
      },
      "/upload": {
        target: "http://192.168.1.168:3000",
        changeOrigin: true,
        ws: false,
        secure: false
      }
    }
  }
};