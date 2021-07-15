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
├─assets    包含无需编译的资源，如样式或者Sass文件，images或fonts；推荐使用`~`作为路径别名，你可以使用`~~`来作为根目录的别名。           
├─components 存放后面将**被导入到pages**里的所有vue组件；once you have components set to true，Nuxt**自动导入组件到.vue文件**    
├─content       
├─layouts  通过在此目录添加`default.vue`可以继承main layout；当创建一个包含了page component的layout时，确保添加`<Nuxt>`组件;    
├─middleware  包含应用的中间件。Middleware让你定义自定义函数，能够在渲染无论是一个page还是一组page（layout）之前执行。    
├─modules  modules是函数集合，当Nuxtjs启动时，会按照顺序执行这些函数。framework等待每一个module执行完毕之后才继续。这样，modules能自定义项目几乎所有方面。modules能为某些入口点（如builder initialization）很容易的注册hooks.Modules也能覆盖templates,配置webpack loaders，添加css库和执行很多其他有用的任务。                   
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

**asyncData**    
每当加载组件之前，asyncData就会被调用，它可能是异步的，并且接收context作为参数。返回的对象将会和你的data对象合并。

**fetch**    
每当你需要获取异步数据的时候你可以使用fetch.当渲染路由和在浏览器端导航的时候，Fetch是在服务端被调用

**head**    
为当前页面设置指定的标签。Nuxt使用`vue-meta`来修改你的应用中文档的head和meta属性    

**layout**    
指定在layouts目录下的一个layout

**loading**    
如果设置成false，阻止一个页面手动调用`this.$nuxt.$loading.finish()`,当你进入页面，`this.$nuxt.$loading.start()`就会执行直到你离开页面，允许你手动控制loading的行为。    

**transition**
为页面定义指定的过渡    

**scrollToTop**
`scrollTop`属性让你告诉Nuxt，在渲染页面之前滚动到顶部。默认情况下，当你去到其他页面时，Nuxt滚动到顶部，但是有子路由时，Nuxt保持滚动的位置，当渲染你的子路由时，如果你想要告诉Nuxt滚动到顶部，设置`scrollToTop`为`true`

```js
export default {
  scrollTop: true
}
```
相反地，你也可以在父级路由手动设置`scrollToTop`为`false`    

**middleware**    
为当前页面定义中间件，中间件会在页面渲染之前被调用。    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**命名中间件**    
在`middleware/`目录下创建一个文件来使用命名中间件，文件名就是中间件的名字：
```js
                   middleware/authenticated.js
export default function ({ store, redirect }) {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```
```js
export default {
  middleware: 'authenticated'
}
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**匿名中间件**
```html
                    pages/secret.vue
<template>
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
``` 

**watchQuery属性**    
使用`watchQuery`属性为query strings设置一个watcher.如果这个查询字符串改变了，所有组件的方法（asyncData,fetch(context),validate,layout）将会被调用。为了提高性能，watching默认被禁止了。    

你也可以使用函数`watchQuery(newQuery, oldQuery)`来更精确的控制watchers    

```js
export default {
  watchQuery (newQuery, oldQuery) {
    return newQuery.foo && oldQuery.bar
  }
}
````

**忽略pages**    

如果你想要忽略page以便它们不再被包含到生成的`router.js`文件中，然后你可以通过添加前缀-来忽略它们。
例如，`pages/-about.vue`将会被忽略

**配置**    
通过设置`dir.pages`选项，你可以重命名`pages/`目录为其他不同的名字：
```js
export default {
  dir: {
    pages: 'routes
  }
}
```

`页面组件的属性`    
**Layouts**
母版组件        
**Document App.html**
在Nuxt应用中，app template用来创建doucment的实际HTML frame，同时会给head和body注入内容；通过在项目根目录创建app.html，你可以自定义HTML app template，来加载scripts或带条件的css类。

2、Context and Helpers
`context`    

`context`对象在指定的Nuxt函数中可用，比如`asyncData`、`plugins`,`middleware`和`nuxtServerInit`.它提供了当前请求的额外的和通常可选的信息。首先并且最重要的是，context用于提供访问nuxtjs应用的其他部分，例如：Vuex store或潜在的`connect`实例，因此，我们在服务端和`store`里可使用context对象访问`req`和`res`对象。但是随着时间的推移，context被继承了很多其他有用的变量和快捷访问。在开发模式下，现在我们能访问HMR功能，当前的route、page `params`和`query`,也能选择性的通过context访问环境变量。此外，module functions和helpers被暴露出来，同时在客户端和服务端访问。    

**使用page参数获取API查询参数**    
context通过`context.params`直接暴露路由上可能的动态参数;`context.query`获取路由查询字符串参数。    

**重定向用户&访问store**
通过`context`可以访问Vuex store。它提供了一个类似于Vue组件的`this.$store`的`store`对象。另外，当授权失败的时候，我们可以使用通过context暴露出来的帮助函数`redirect`方法，来重定向用户；    


```js
export default {
  middleware ({ store, redirect }) {
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login)
    }
  }
}
```

`Helpers`    
**`$nuxt`**    
`$nuxt`是一个辅助对象，为提升用户体验而设计，有些情况下，他是一个"安全舱口".在Vue组件中可以通过`this.$nuxt`来访问，另外，在客户端可以使用`window.$nuxt`

**网络连接检测**    
$nuxt提供一个快速发现用户的网络连接是否在线。它暴露除了`isOffline`和`isOnline`两个布尔值。只要用户离线，我们可以使用它们去显示一段消息。

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">you are offline</div>
    <Nuxt/>
  </div>
</template>
```

**访问根实例**    
$nuxt提供了一个快捷方式从每一个其他组件中访问应用的根实例。在Vue组件的外面，`window.$nuxt`可被用作一个安全仓来获得访问像`$axios`这样的module方法。这种能力应该理智的使用，**只是作为最后的手段**。    

**刷新page数据**    
当你想要为用户刷新当前页面时，你不想完整的重新载入页面，因为这会再次触发服务器，并且最少会重新初始化整个Nuxtjs应用。相反的，你经常仅仅需要刷新由`asyncData`或`fetch`提供的数据，我们可以使用`this.$nuxt.refresh()`来实现。    

```html
  <template>
    <div>
      <div>{{ content }}</div>
      <button @click="refresh">Refresh</button>
    </div>
  </template>
```

```js
  export default {
    asyncData () {
      return {
        content: 'Created at' + new Date()
      }
    },
    methods: {
      refresh () {
        this.$nuxt.refresh()
      }
    }
  }
```
**控制加载条**    
使用$nuxt,你也能通过`this.$nuxt.$loading`编程式控制Nuxt的加载条。
```js
export default {
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  }
}
```

**onNuxtReady辅助函数**    
如果你想要在Nuxtjs应用加载完成后执行某些脚本，你可以使用`window.onNuxtReady`函数。当你想要在客户端执行一个函数而不增加网站的交互时间时，这很有用。    

**Process辅助对象**    
Nuxt.js注入三个布尔值(`client`,`server`和`static`)到全局`process`对象，帮助我们去判断当前应用的渲染是在服务端还是完全在客户端，同时也检查是否是静态站点生成。这些帮助对象贯穿整个应用，通常用在`asyncData`用户区代码。    
```html
  <template>
    <h1>i am rendered on the {{ renderedOn }} side</h1>
  </template>
  <script>
    export default {
      asyncData () {
        return {
          renderedOn: process.client ? 'client' : 'server'
        }
      }
    }
  </script>
```    
在上面的例子中，当使用服务端渲染，并且用户直接访问页面，renderedOn将会计算为server。当用户导航到这个应用的其他部分的页面时，比如点击了`<NuxtLink/>`,renderedOn将会`计算成client`。    

`Server Side Rendering(SSR)`    
服务端渲染，是应用程序作出贡献的能力，通过在服务端展示web页面，而不是在浏览器渲染它。服务端发送一个完整的已经渲染好的页面给客户端，客户端的js bundle接管，之后让Vuejs应用混入进来。    

**Node.js服务前置条件**    
需要一个js环境用于渲染web页面。    
一个Nodejs服务需要被配置，用来执行你的vue应用。    

**继承和控制server**    
你可以使用serverMiddleware继承server，同时使用middleware控制路由。    

**Server vs Browser环境变量**    
因为你是在Nodejs环境下，你可以访问像`req`和`res`的Nodejs对象，你不能访问`window`或`document`对象，因为他们属于浏览器环境。然而你可以通过使用`beforeMount`或`mounted`钩子来使用`window`或`document`
```js
beforeMount () {
  window.alert('hello')
}
mounted () {
  window.alert('haha')
}
```

**Nuxtjs服务端渲染步骤**    
1. 浏览器到服务器
当一个浏览器发送初始请求，它会命中Nodejs内部服务。Nuxtjs将会生成HTML并且将它和执行函数的结果一并发送回给浏览器，比如`asyncData`,`nuxtServerInit`或`fetch`，也会执行hooks函数。    

2. 服务器到浏览器    
浏览器从服务端接收使用生成的HTML渲染后的页面。内容呈现并且vuejs接管了由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。经过这个过程，页面就可以交互了（表示vue响应式已经激活了）。    

3. 浏览器到浏览器
使用`<NuxtLink/>`进行页面间的导航是在浏览器端完成的，因此你不会再次命中服务端，除非你强制刷新了浏览器。    

**`警告`**    
**window或document undefined**    
这个取决于服务端渲染。如果你需要指定你仅仅想要在浏览器端导入一个资源，你需要使用`process.client`变量.    
例如，在你的`.vue`文件里：
```js
if (process.client) {
  require('external_library')
}
```
**IOS和手机上的数字**  
一些移动端Safari浏览器版本会自动转换手机号为链接。这会触发一个`NodeMismatch`警告，因为SSR内容不再匹配网站内容。这会导致你的应用在这些Safari版本的浏览器上不再可用。    
如果在你的Nuxt page里包含了手机号，你有两个选择：    
**使用一个meta标签来阻止转换**    
```html
  <meta name="format-detection" content="telephone=no">
```

**使用一个链接包裹你的手机号**    
```html
  <template>
    <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
  </template>
```

`配置`    
**build**        
Nuxt允许你在自动生成的`vendor.bundle.js`文件中添加一些模块，以减少应用bundle的体积。    

styleResources    
当需要在页面中注入一些变量和mixin而不必每次都导入它们时，这非常有用。Nuxt.js使用[style-resources-module](https://github.com/nuxt-community/style-resources-module)来实现这种行为。您需要为css预处理器指定要包含的模式/路径（不能使用别名），你需要使用相对或绝对路径。    
安装style-resources:

```js
npm i @nuxtjs/style-resources
```
修改`nuxt.config.js`：
```js
export default {
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: './assets/variables.scss'
  }
}
```    

**环境变量配置**    
nuxt可以配置在客户端和服务端共享的环境变量。
`nuxt.config.js`:    

```
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```
然后，我们可以通过以下两种方式来使用`baseUrl`变量：
1、通过process.env.baseUrl
2、通过`context.baseUrl`
举个例子，我们可以利用它来配置axios的自定义实例。    
`plugins/axios`:    

```js
import axios from 'axios'
export default axios.create({
  baseURL: process.env.baseUrl
})
```
然后在页面中，我们可以使用`import axios from '~/plugins/axios'`引入`axios`模块。     

Nuxt 2.13开始提供了runtime config和内置的dotenv支持，拥有更好的安全性和更快的开发体验。有两个新增的选项加入到了`nuxt.config.js`文件，它们允许传递运行时的配置，这些配置可以在context的`$config`属性中访问。尽管env选项和runtime config增加了Nuxt的负荷，但是，当在开发环境、服务端渲染或单页应用下修改runtime配置不需要重新构建。尽管对于静态站点来说你仍然需要重新生成你的站点来查看修改。
```js
export default {
  publicRuntimeConfig: {},
  privateRuntimeConfig: {}
}
```   
- `publicRuntimeConfig`应该保存所有需要在前端暴露的env变量。例如可以包含一个你的公共URL的引用。    
- `privateRuntimeConfig`应该保存所有不应该在前端暴露的env变量。例如API secret token。    
**在服务端privateRuntimeConfig总是覆盖publicRuntimeConfig**.`$config`在服务端是{...public, ...private}，但是在客户端只有 {...public}


**自动注入环境变量**    
如果在构建阶段定义以`NUXT_ENV_`开头的环境变量，例如：`NUXT_ENV_COOL_WORD=freezing nuxt build`,它们将自动注入环境变量中。    
 




## 特性
### Nuxt Component
`<Nuxt>组件`    
`<Nuxt>`组件用于展示你的page组件。基本上，这个组件被替换成什么，取决于正在显示的页面内容是什么。因此，在你的layouts上添加`<Nuxt>`组件很重要。

> `<Nuxt>`组件只能在layouts里使用

<Nuxt>组件可以带上`nuxt-child-key`的属性。这个属性将会被传递给`<RouterView>`,因此，在动态pages里，你的过渡将会正常工作。    

<span id="rv">有2种方式处理`<RouterView>`的内部`key`</span>    
1. 在你的<Nuxt>组件中使用一个`nuxtChildKey`属性    
```js
<template>
  <div>
    <Nuxt :nuxt-child-key="someKey">
  </div>
</template>    
```    

2. 在page组件中添加`key`选项，值为字符串或者函数    
```js
export default {
  key (route) {
    return route.fullPath
  }
}
```    

`NuxtChild组件`    
这个组件用于在嵌套的路由中展示子组件    

`keep-alive`    
`<Nuxt>`组件和`<NuxtChild/>`组件都接收`keep-alive`和`keep-alive-props`;(与Vue的keep-alive一样)    


`链接预提取`    
Nuxt自动包括了智能的预提取。这意味着它检测到当一个链接可见的时候，无论是已经在视口或者是滚动后显示在视口，会对这些页面预提取js。当用户点击链接的时候，那些js文件已经提前加载完成了。Nuxt仅当浏览器不忙的时候加载资源，如果你的连接掉线，或者你使用的2G网络连接，那么就会跳过预加载。    

**对指定的连接禁用预提取**    
```html
  <NuxtLink to="/about" no-prefetch></NuxtLink>
```    

```html
  <NuxtLink to="/about" :prefetch="false"></NuxtLink>
```

`linkExactActiveClass`    
精准匹配路由，加上指定的class

```css
.nuxt-link-exact-active {
  color: green;
}
```    
> 这个css可以被添加到导航组件，或者一个指定的page或layout，或在你的main.css文件    

`linkPrefetchedClass`    
linkPrefetchedClass会让你为所有已预提取的链接添加styles。this is great for testing which links are being prefetched after modifying the default behavior.默认是禁用的。如果你想启用它，你需要在`nuxt-config.js`文件里的router属性中添加它。    

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

之后你就能为那个class添加样式了：

```css
.nuxt-link-prefetched {
  color: orangered;
}
```

`client-only组件`    
这个组件用于确保一个组件只在客户端被渲染。为了仅在客户端导入一个组件，在client-side only插件里注册这个组件    

```html
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- this component will only be rendered on client-side -->
      <comments />
    </client-only>
  </div>
</template>
```
使用一个插槽作为占位，直到`<client-only/>`在客户端mounted    
```html
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- this component will only be rendered on client-side -->
      <comments />

      <!-- loading indicator, rendered on server-side -->
      <comments-placeholder #placeholder />
    </client-only>
  </div>
</template>
```

## Transitions
Nuxt使用的是Vue Transition组件；为了给指定路由定义一个自定义的过渡，你需要在page组件里加上`transition`键：

```js
export default {
  export default {
    // Can be a String
    transition: ''
    // Or an Object
    transition: {}
    // or a Function
    transition (to, from) {}
  }
}
```

**String**    
如果`transition`键被设置成一个字符串，他将会被用作trnasition.name    
```js
export default {
  transition: 'home'
}
```

Nuxt将会使用这个设置如下设置组件：

```html
<transition name="home"></transition>
```
> 你无需手动添加\<transition\>组件到你的pages或layouts，nuxt会自动为你完成

现在你只需要为你的过渡添加号对应的class就好了：

```css
<style>
.home-enter-active, .home-leave-active {
  transition: opacity .5s;
}
.home-enter, .home-leave-active {
  opacity: 0;
}
</style>
```    

**Object**    
如果`transition`设置成object
```js
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```    

Nuxt将会使用这些设置如下设置组件:    

```html
<transition name="home" mode="out-in"></transition>
```

**Transition Mode**    
> 默认是`out-in`，如果你想离开和进入过渡动画同时进行，则设置`mode: ''`


**Function**    
如果`transition`键设置成function：

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```
过渡将会被应用在路由上    
## 组件俗语
### validate
Nuxt让你能在你的动态路由组件里定义一个validator方法；    
每当导航到新的一个路由，`validate`就会被调用。它会在服务端被调用一次（在第一次请求Nuxt应用时），在客户端每次导航到其他路由时都会被调用。这个方法带有一个`context`对象作为参数。
```js
validate({ params, query, store }) {
  return true // 如果参数有效
  return false  // 将会阻止Nuxt渲染路由，并且展示错误页面
}
```

### key属性
`key`属性会被传递给内部组件`<router-view>`,在动态page和不同路由中做过渡非常有用。不同的key会让page组件重新渲染。 请参考[这里](#rv)


## 部署
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


## 使用nuxt注意点
### Nuxt官方封装的$axios
$axios.$get：只有官方封装的axios才有此方法，它直接返回了data
$axios.get：跟原生的axios返回的数据一样，带有请求的配置信息

### process.client    
由于我们组件的代码需要先在服务端运行，再到浏览器运行，可能会出现在服务端运行vue组件或js时报错（vue组件中导入了第三方css也可能会引起报错），所以需要使用process.client来判断是不是浏览器端。
[sass](./SASS.md)
