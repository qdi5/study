# element-pc-responsive

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 笔记
### sass
**定义数组变量**
```scss
    $grid-breakpoints: (
        xs: 0,
        sm: 576px,
        md: 768px,
        lg: 992px,
        xl: 1200px
    ) !default;
```
> !default表示是默认值，如果在此之前，已经定义过$grid-breakpoints，则以之前定义的值为准

**从数组中取值**
```scss
    nth($grid-breakpoints, 2) // 从数组$grid-breakpoints中取第二个值，也就是"sm: 567px"
```
上面取出的值"sm: 576px"，在sass中也属于数组，再使用nth((sm: 576px), 2)就能取出576px了

### bootstrap断点设置
```css
@media (min-width: 1200px)
.container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1140px;
}

@media (min-width: 992px)

.container-lg, .container-md, .container-sm, .container {
    max-width: 960px;
}
@media (min-width: 768px)

.container-md, .container-sm, .container {
    max-width: 720px;
}
@media (min-width: 576px)

.container-sm, .container {
    max-width: 540px;
}

.container, .container-fluid, .container-xl, .container-lg, .container-md, .container-sm {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
```

### bootstrap-vue布局和网格系统
5个默认的响应式层，css Sass变量和混入，和许多预置的类。    
BootstrapVue 提供一些定制的方便的功能组件，相对于传统的Bootstrap4标记来说，会使你的复杂页面标记简单化    

Column属性`cols`表明，在每行可能的12列之外你想要使用的列的数量，不用管断点是什么。因此，如果在任意断点，你想要等宽的三列，你可以使用`<b-col cols="4">`。

列属性`sm,md,lg,xl`表示在不同断点处，每行可能使用12个列中要使用的列数。因此，如果在断点`sm`处需要三个等宽列，可以使用`<b-col sm="4">`.特殊值`auto`可用于占用行中剩余的可用列空间。    

列`宽`是按百分比设置的，因此他们总是相对于父元素流动和调整大小。

列具有水平的`padding`来在每个单独的列中创建间隔，然而，通过在`<b-row>`中设置`no-gutters`属性，你可以移除`<b-row>`的`margin`和`<b-col>`的`padding`。

为了使得网格响应式，有五个网格断点，其中有一个对于所有断点都有用:`xs`；其他四个断点，分别是sm、md、lg和xl；

网格断点基于最小宽度的媒体查询，这意味着它应用于大于或等于当前的断点。（比如：`<b-col sm="4">`应用于sm、md、lg、xl设备，但是不应用于位于第一位的`xs`断点）    

你可以使用预定义的网格类或Sass mixins混合来进行更多的语义标记。    

**Containers**`<b-container>`
默认情况下，Containers(`<b-container>`)是一个响应的固定宽度（这意味着在每一个断点中`max-width`都会改变），通过设置`fluid`属性设置流式宽度（总是100%宽度），或者是一个响应式容器，在特定断点时变成流式容器（需要Bootstrap CSS `v4.4+`）

**Grid options**
定义大多数的大小值都是使用`em`或`rem`单位，`px`s用于网格断点和容器宽度。这是因为视口宽度是px，并且不会随着字体而改变。    

**注意事项：**    
- 没有`xs`属性。`cols`属性引用`xs`（最小）断点    
- 上面的断点值和名称是Bootstrap默认值。他们可以通过SCSS变量自定义，如果需要使用自定义断点名称，同各国BootstrapVue全局配置来设置。

**容器大小**    

下表列出了在不同断点时默认容器最大宽度：    

|容器类型|最小 `<576px`|小 `>=576px`|中`>=768px`|大`992px`|最大`>=1200px`|
|----|----|----|----|----|----|
|default|100%|540px|720px|960px|1140px|
|fluid|100%|100%|100%|100%|100%|
|fluid="sm"|100%|540px|720px|960px|1140px|
|fluid="md"|100%|100%|720px|960px|1140px|
|fluid="lg"|100%|100%|100%|960px|1140px|
|fluid="xl"|100%|100%|100%|100%|1140px|

**自动布局列**    
利用指定断点的列类名来轻松分配列大小，而无需一个像`<b-col sm="6">`明确指定数字的属性

**等宽列**    
有两个应用于每个设备和视口的网格布局，从`xs`到`xl`.为所需的每个断点添加任意数量的无单元类，每列的宽度将相同。    

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>1 of 2</b-col>
    <b-col>2 of 2</b-col>
  </b-row>

  <b-row>
    <b-col>1 of 3</b-col>
    <b-col>2 of 3</b-col>
    <b-col>3 of 3</b-col>
  </b-row>
</b-container>
```    

**多行等宽列**    
通过在需要换行的地方插入`.w-100`来创建跨越多行的等宽列，通过将`.w-100`与[responsive display utilities](https://getbootstrap.com/docs/4.5/utilities/display)    

**设置一列宽度**    
Flexbox网格列的自动布局还意味着你可以设置一列的宽度，在其周围的同级列会自动调整大小

**可变宽度内容**
使用`{breakpoint}="auto"`属性可以根据其内容的自然宽度来调整列的大小。    

**响应类**    
Bootstrap的网格包括五层预定义的类，用于构建复杂的响应式布局。在您认为合适的xs、sm、md、lg或xl设备上自定义列的大小。

**所有断点**

对于从最小的设备到最大的设备网格都一样大的情况，使用`col`和`cols="*"`属性。当使用一个特殊大小的列时，指定多个`cols`.否则，坚持使用`col`（如果没有设置`cols`，则会自定应用）

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>col</b-col>
    <b-col>col</b-col>
    <b-col>col</b-col>
    <b-col>col</b-col>
  </b-row>

  <b-row>
    <b-col cols="8">col-8</b-col>
    <b-col cols="4">col-4</b-col>
  </b-row>
</b-container>
```

**堆叠到水平**    

使用一组`sm="*"`或`sm`（布尔值，表示相同宽度的@sm）属性，你可以创建一个基础的网格系统，在md设备上变成水平之前，在xs设备上堆叠。    

**混合搭配**    
不想让你的列简单堆叠在某一些网格层中？根据需要为每层使用不同的属性组合：    

```html
<b-container class="bv-example-row">
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <b-row>
    <b-col cols="12" md="8">cols="12" md="8"</b-col>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
  </b-row>

  <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
  <b-row>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
  </b-row>

  <!-- Columns are always 50% wide, on mobile and desktop -->
  <b-row>
    <b-col cols="6">cols="6"</b-col>
    <b-col cols="6">cols="6"</b-col>
  </b-row>
</b-container>
```
**对齐**    
使用flexbox对齐工具类用来垂直或水平对齐列

> **注意事项：** 当flex容器有`min-height`时，ie11不支持垂直居中一个flex子元素，

**垂直对齐**    
对于在一行中垂直居中所有网格单元，可以在`<v-row>`中使用`align-v`；可能的值有`start`、`center`、`end`、`baseline`和`stretch`。    

对于单独的单元格垂直对齐，在<b-col>上使用`align-self`属性。可能的值有'start','center','end','baseline'和'stretch'    

**水平对齐**    
在一行内水平对齐网格单元，在`<b-row>`上使用`align-h`属性，可能的值有：`start`,`center`,`end`,`around`和`between`

**重新排序**

**列排序**

使用`order-*`属性控制内容的视觉顺序。这些属性具有响应能力，因此你可以按断点设置顺序（例如：order="1" order-md="2"）.包括对所有五个网格层的1到12的支持；`<b-col>`默认order的值是0

**偏移列**
使用`offset-*`来偏移列    

**margin辅助类**    
你可以使用像`.mr-auto`这样的margin和spacing辅助类来强制同级列彼此远离；

**嵌套网格**
要将内容与默认网格嵌套，请在现有的`<b-col>`组件内添加一个新的`<b-row>`和一组`<b-col>`组件。嵌套行应包括一组总计不超过12个或更少的列（不需要全部使用12个可用列）    

**行列（设置一行有几列）**    
使用`<b-row>`中的响应式`cols-*`属性可以快速设置最能呈现您的内容和布局的列数。普通的列宽适用于各个`<b-col>`列（例如,`<b-col md="4">`）,而行列`col-*`属性在父级`<b-row>`上设置，作为快捷方式。    

使用这些行列可以快速创建基本的网格布局或控制您的卡片布局。Bootstrap v4.4中默认的最大行列数是6。    

`<b-row>`属性中指定的值是每行要创建的列数。（而`<b-col>`上的属性指的是要占用的列数）










