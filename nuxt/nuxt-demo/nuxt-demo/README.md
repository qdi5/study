# nuxt-demo

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

## `笔记`
### 特性
- 自动的路由；Nuxt会基于`pages`目录下的Vue文件自动生成`vue-router`配置，也会自动将路由代码进行`code-splitting`（代码切割）；<NuxtLink>用于内部导航；a标签用于外部导航。
- 
### 目录结构
├─.nuxt
├─assets    包含无需编译的资源，如styles，
├─components 存放后面将**被导入到pages**里的所有vue组件；once you have components set to true，Nuxt**自动导入组件到.vue文件**    
├─layouts  通过在此目录添加`default.vue`可以继承main layout；当创建一个包含了page component的layout时，确保添加`<Nuxt>`组件;
├─pages    包含项目的视图和路由
├─plugins    在根vue应用初始化之前，需要执行的js插件；这里可以添加vue插件和注入函数/变量；每次你使用`Vue.use()`，应该在`plugins/`下创建一个文件，并且在`nuxt.config.js`的`plugins`属性中添加它的路径          
├─static    里面的文件直接映射到server根路径，保持文件名不变化或者不会改变的文件可以放在此目录（相当于vue的public）    
├─store    包含`vuex store`文件；nuxt自带vuex，开箱即用，但是默认是被禁用了；在此目录下新建`index.js`文件启用vuex store;在此目录下的每一个`.js`文件都会转换成**vuex里的Modules**；为了避免在服务端不小心共享了state数据，state的值应该`始终是一个函数`。如果名为`nuxtServerInit`的action在store里定义了，并且mode为`universal`，nuxt将会在context（仅仅在服务端）中调用它；这会很有用，当我们有些数据在服务端我们想直接给客户端时；只有主模块（store/index.js）才会接收这个`nuxtServerInit`action，你将需要在此让modlue action链式调用）
├─nuxt.config.js    单点配置；添加modules或者覆盖默认设置    
├─package.json    包含项目的所有依赖和脚本
└─

### 核心概念
一、Views    
给指定的路由配置data和views，由template、layout和一个实际的page组成。你可以自定义head的meta标签，对于SEO非常重要。    

1、Pages    
每一个Page组件是一个Vue组件，但是Nuxt添加了一些特别的属性和函数，使得开发应用越来越简单。    
**Dynamic Pages**
当你的page名称取决于一个API时，或者你不想重复的创建同一个page时，页面的名称你是不知道的。这时，创建Dynamic pages就很有用了。为了创建一个dynamic page你需要在你的`.vue文件`或者是`目录`之前添加一个"_"，如果你想让你的目录变成动态的，你可以任意命名那个文件或目录为你想要的名字，但是你必须加上前缀"_"

`页面组件的属性`    
**Layouts**
母版组件        
**Document App.html**
在Nuxt应用中，app template用来创建doucment的实际HTML frame，同时会给head和body注入内容；通过在项目根目录创建app.html，你可以自定义HTML app template，来加载scripts或带条件的css类。

2、Context and Helpers
`context`对象在指定的Nuxt函数中可用，比如`asyncData`、`plugins`,`middleware`和`nuxtServerInit`.它提供了当前请求的额外的和通常可选的信息。首先并且最重要的是，context用于提供访问nuxtjs应用的其他部分，例如：Vuex store或潜在的`connect`实例，因此，我们在服务端和`store`里可使用context对象访问`req`和`res`对象。但是随着时间的推移，context被继承了很多其他有用的变量和快捷访问。在开发模式下，现在我们能访问HMR功能，当前的route、page `params`和`query`,也能选择性的通过context访问环境变量。此外，module functions和helpers被暴露出来，同时在客户端和服务端访问。    

**使用page参数获取API查询参数**    
context通过`context.params`直接暴露路由上可能的动态参数


### 部署
1. pm2部署    
- 全局安装pm2；npm install pm2 -g
- 在nuxt项目根目录新建配置文件`ecosystem.config.js`，内容如下：    
```js
module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
```
- 构建和服务应用程序                
npm run build
pm2 start
