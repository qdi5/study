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
