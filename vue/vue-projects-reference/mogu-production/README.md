# mooc-mogujie

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## css架构笔记
### SASS
1、全局的variables、mixins和functions等这些在实际的构建中不会存在，可以在webpack中全局导入，这样在所有组件中，就可以省略导入过程
### css架构思想
1、使用属性选择器达到acss架构样式极限复用