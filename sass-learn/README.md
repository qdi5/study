# SASS
## 语法格式
sass有两种语法格式。首先是SCSS，这种格式仅在CSS3语法的基础上进行扩展，所有CSS3语法在SCSS中都是通用的，同时加入Sass的特色功能。此外，SCSS也支持大多数CSS hacks写法以及浏览器前缀写法（vendor-specific syntax），以及早期的IE滤镜写法。这种格式以`.scss`作为扩展名。    

另一种也是最早的Sass语法格式，被成为缩进格式（Indented Sass）通常简称"Sass",是一种简化格式。它使用"缩进"代替"花括号"表示属于某个选择器，用"换行"代替"分号"分隔属性。缩进格式也可以使用Sass的全部功能，只是与SCSS相比个别地方采取了不同的表达方式，具体请看[the indented syntax reference](https://sass-lang.com/documentation/syntax)    

## CSS功能拓展    
### 嵌套规则    
```css
#main p {
    color: #00ff00;
    width: 97%;
    .redbox {
        background-color: #ff0000;
        color: #000;
    }

}
```    

**父选择器`&`**        
在嵌套CSS规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定`hover`样式时，或者当`body`元素有某个classname时，可以用`&`代表嵌套规则外层的父选择器。

```css
a {
    font-weight: bold;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    body.firefox & {
        font-weight: normal;
    }
}
```

编译为

```css
a {
    font-weight: bold;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
body.firefox a {
    font-weight: normal;
}
```    

编译后的CSS文件中`&`将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递：    
```css
#main {
    color: black;
    a {
        font-weight: bold;
        &:hover {
            color: red;
        }
    }
}
```
编译为    

```css
#main {
    color: black;
}
#main a {
    font-weight: bold;
}
#main a:hover {
    color: red;
}
```    

`&`必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如：    
```css
#main {
    color: black;
    &-sidebar {
        border: 1px solid;
    }
}
```
编译为    

```css
#main {
    color: black;
}
#main-sidebar {
    border: 1px solid;
}
```    

**属性嵌套**    
有些CSS属性遵循相同的命名空间，比如`font-family, font-size, font-weight`都以`font`作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass允许将属性嵌套在命名空间中，例如：    
```css
.funky {
    font: {
        family: fantasy;
        size: 30em;
        weight: bold;
    }
}
```

编译为    

```css
.funky {
    font-family: fantasy;
    font-size: 30em;
    font-weight: bold;
}
```    

命名空间也可以包含自己的属性值，例如：

```css
.funky {
    font: 20px/24px {
        family: fantasy;
        weight: bold;
    }
}
```

编译为    

```css
.funky {
    font: 20px/24px;
    font-family: fantasy;
    font-weight: bold;
}
```    

**占位符选择器`%foo`**    
与常用的id与class选择器写法相似，只是`#`或`.`替换成了`%`。必须通过[@extend](#extend)指令调用

## SassScript
在CSS属性的基础上Sass提供了一些名为SassScript的新功能。SassScript可作用于任何属性，允许属性使用变量、算术运算等额外功能。    
通过interpolation,SassScript甚至可以生成选择器或属性名，这一点对编写mixin有很大帮助。

### 变量`$`
SassScript最普遍的用法就是变量，变量以美元符号开头，赋值方法与CSS属性的写法一样：

```css
$width: 5em;
```
直接使用变量即调用变量：
```css
#main {
    width: $width;
}
```

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加`$global`声明：

```css
#main {
    $width: 5em !global;
    width: $width;
}

#sidebar {
    width: $width;
}
```

编译为    
```css
#main {
    width: 5em;
}

#sidebar {
    width: 5em;
}
```

### 数据类型
SassScript支持6中主要的数据类型：    
- 数字,`1,2,13,10px`
- 字符串,有引号字符串与无引号字符串,`"foo",'bar', baz`
- 颜色,`blue,#04a3f9, rgba(255,0,0,.5)`
- 布尔值,`true,false`
- 空值,`null`
- 数组(list),用空格或逗号作为分隔符，`1.5em 1em 0, Helvetica, Arial, sans-serif`
- maps，相当于JavaScript的object，`(key1: value1, key2: value2)`    

SassScript也支持其他CSS属性值，比如Unicode字符集，或`!important`声明。然而Sass不会特殊对待这些属性值，一律视为无引号字符串。    

**字符串**    
SassScript支持CSS的两种字符串类型：有引号字符串，如`"xxx"``sass-lang.com`;与无引号字符串（unquoted strings）,如`sans-serif``bold`,在编译CSS文件时不会改变其类型。只有一种情况例外，使用`#{}`(interpolation)时，有引号字符串将被编译为无引号字符串，这样便于在mixin中引用选择器名：

```css
@mixin firefox-message($selector) {
    body.firefox #{$selector}:before {
        content: "Hi, Firefox users!"
    }
}
@include firefox-message(".header")
```

**数组**    
数组(lists)指Sass如何处理CSS中`margin: 10px 15px 0 0`或者`font-face: Helvetica, Arial, sans-serif`这样通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组——只包含一个值的数组。    
数组本身没有太多功能，但[Sass list functions](https://sass-lang.com/documentation/modules#list-functions)赋予了数组更多新功能：`nth`函数可以直接访问数组中的某一项；`join`函数可以将多个数组连接在一起；`append`函数可以在数组中添加新值；而`@each`指令能够遍历数组中的每一项。    
数组中可以包含子数组，比如`1px 2px, 5px 6px`是包含`1px 2px`与`5px 6px`两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成`(1px 2px) (5px 6px)`。变化是，之前的`1px 2px, 5px 6px`使用逗号分割了两个子数组，而`(1px 2px) (5px 6px)`则使用空格分割。    

**Maps**    
Maps可视为键值对的集合，键被用于定位值，在css中没有对应的概念。和Lists不同Maps必须被圆括号包围，键值对被逗号分割。Maps中的keys和values可以是sassscript的任何对象。map-get函数用于查找键值，map-merge函数用于map和新加的键值融合，@each命令可添加样式到每一个map中的每个键值对。Maps可用于任何Lists可用的地方，在List函数中Map会被自动转换为List，如(key1: value1, key2: value2)会被List函数转换为key1 value1, key2 value2,反之则不能。

**颜色**    
任何CSS颜色表达式都返回一个SassScript颜色值。这包含了大量的有名字的无引号的颜色值（red、blue等等），在压缩模式下，会尽量精简输出；尽量用引号括住red等这种命名的颜色值，当压缩模式下，避免插值到选择器上变成一个无效的语法

### 运算
所有数据类型均支持相等运算`==`或`!=`，此外，每种数据类型也有其各自支持的运算方式。    

**数字运算**
SassScript支持数字的加减乘除、取整等运算（+,-,*,/,%），如果必要会在不同单位间转换值。    

```css
p {
    width: 1in + 8pt;
}
```
编译    
```css
width: 1.111in;
```
关系运算`<,>,<=,>=`也可用于数字运算，相等运算`==,!=`可用于所有数据类型。    

- 除法运算`/`    
    `/`在CSS中通常起到分隔数字的用途。    
以下三种情况`/`将被视为除法运算符号：
    - 如果值，或值的一部分，是变量或者函数的返回值    
    - 如果值被圆括号包裹
    - 如果值是算数表达式的一部分

```css
p {
    font: 10px/8px;    // 无计算
    $width: 1000px;    
    width: $width/2;  // 使用变量，执行计算
    width: round(1.5)/2;    // 使用一个函数，执行计算
    height: (500px/2);    // 使用圆括号，执行计算  
    margin-left: 5px + 8px/2px; // 用户使用 + 号，执行计算
}
```
编译为    
```css
p {
    font: 10px/8px;
    width: 500px;
    height: 250px;
    margin-left: 9px;
}
```

如果需要使用变量，同时又要确保`/`不做除法运算而是完整地编译到CSS文件中，只需要用`#{}`插值语句将变量包裹。    
```css
p {
    $font-size: 12px;
    $line-height: 30px;
    font: #{$font-size}/#{$line-height}
}
```

编译为    
```css
p {
    font: 12px/30px;
}
```
**颜色值运算**    
```css
p {
    color: #010203 + #040506;
}
```     
计算`01 + 04 = 05` `02 + 05 = 07` `03 + 06 = 09`，然后编译为：
```css
p {
    color: #050709;
}
```

**字符串运算**    
`+`可用于连接字符串
```css
p {
    cursor: e + -resize;
}
```
编译为    
```css
p {
    cursor: e-resize;
}
```
注意，如果有引号字符串（位于`+`左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于`+`左侧）连接有引号字符串，运算结果则没有引号。    

```css
p:before {
    content: "Foo" + Bar;
    font-family: sans- + "serif";
}
```
编译为    
```css
p:before {
    content: "Foo Bar";
    font-family: sans-serif;
}
```
运算表达式与其他值连用时，用空格做连接符：
```css
p {
    margin: 3px + 4px auto;
}
```
编译为    
```css
p {
    margin: 7px auto;
}
```
在有引号的文本字符串中使用`#{}`插值语句可以添加动态的值：

```css
p:before {
    content: "I ate #{5 + 10} pies"
}
```
**函数**    















