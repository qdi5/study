const glob = require('glob')
const path = require('path') 

function resolve(dir) {
  return path.join(__dirname, dir)
}
function getEntry(url) {
  let entrys = {}
  glob.sync(url).forEach(item => {
    // splice(-3)取数组后三项
    let urlArr = item.split('/').splice(-3)
    entrys[urlArr[1]] = {
      entry: 'src/pages/' + urlArr[1] + '/' + 'index.js',
      template: 'src/pages/' + urlArr[1] + '/' + 'index.html',
      filename: urlArr[1] + '.html',
      title: 'pages-' + urlArr[1]
    }
  })
  return entrys
}
let pages = getEntry('./src/pages/**?/*.html')
module.exports = {
  pages,
  chainWebpack: (config) => {
    config.resolve.alias.set('components', resolve('src/components'))
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3001,
    open: true,
    hotOnly: true
  }
}