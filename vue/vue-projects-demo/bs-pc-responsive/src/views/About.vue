<template>
  <div class="about">
    <h2>1、流式容器之fluid="md"</h2>
    <b-container fluid="md" style="background-color: red;">
      在md宽度以下是100%
    </b-container>
    <h2>2、多行等宽</h2>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>Column</b-col>
        <b-col>Column</b-col>
        <div class="w-100"></div>
        <b-col>Column</b-col>
        <b-col>Column</b-col>
      </b-row>
    </b-container>
    <h2>3、设置一列宽度</h2>
    <h2>4、可变宽度内容</h2>
    <b-container>
      <b-row>
        <b-col col lg="2">1 of 3</b-col>
        <b-col cols="12" md="auto">在md宽度下，填充剩余所有空间；在xs下，宽度100%</b-col>
        <b-col col lg="2">3 of 3</b-col>
      </b-row>
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col cols="12" md="auto">Variable width content</b-col>
        <b-col col lg="2">3 of 3</b-col>
      </b-row>
    </b-container>
    <h2>5、响应类</h2>
    <h2>堆叠到水平</h2>
    <b-container>
      <b-row>
        <b-col sm="8">col-sm-8</b-col>
        <b-col sm="4">col-sm-4</b-col>
      </b-row>
      <b-row>
        <b-col sm>col-sm</b-col>
        <b-col sm>col-sm</b-col>
        <b-col sm>col-sm</b-col>
      </b-row>
    </b-container>
    <h2>6、混合搭配</h2>
    <b-container>
      <b-row>
        <b-col cols="12" md="8">cols="12" md="8"</b-col>
        <b-col cols="6" md="4">在手机上列垂直排列，一列100%宽度；另一列50%宽度</b-col>
      </b-row>
      <b-row>
        <b-col cols="6" md="4">cols="6" md="4"</b-col>
        <b-col cols="6" md="4">手机上50%，电脑上33.3%</b-col>
        <b-col cols="6" md="4">cols="6" md="4"</b-col>
      </b-row>
      <b-row>
        <b-col cols="6">cols="6" </b-col>
        <b-col cols="6">在手机和电脑上，列始终是50%</b-col>
      </b-row>
    </b-container>
    <h2>7、对齐</h2>
    <b-container>
      <b-row align-v="start" style="height: 100px;background:purple;">
        <b-col>1</b-col>
        <b-col align-self="center">2、align-self给单独的网格单元设置垂直对齐</b-col>
        <b-col>3</b-col>
      </b-row>
      <b-row align-v="center" style="height: 100px;background:purple;">
        <b-col>4</b-col>
        <b-col>5</b-col>
        <b-col>6</b-col>
      </b-row>
      <b-row align-v="end" style="height: 100px;background:purple;">
        <b-col>7</b-col>
        <b-col>8</b-col>
        <b-col>9</b-col>
      </b-row>
      <b-row align-v="baseline" style="height: 100px;background:purple;">
        <b-col>7</b-col>
        <b-col>8</b-col>
        <b-col>9</b-col>
      </b-row>
      <b-row align-v="stretch" style="height: 100px;background:purple;">
        <b-col>10</b-col>
        <b-col>11</b-col>
        <b-col>12</b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row align-h="start">
        <b-col cols="4">1</b-col>
        <b-col cols="4">2</b-col>  
      </b-row>
      <b-row align-h="center">
        <b-col cols="4">3</b-col>
        <b-col cols="4">4</b-col>
      </b-row>
      <b-row align-h="end">
        <b-col cols="4">1</b-col>
        <b-col cols="4">2</b-col>
      </b-row>
      <b-row align-h="around">
        <b-col cols="4">1</b-col>
        <b-col cols="4">2</b-col>
      </b-row>
      <b-row align-h="between">
        <b-col cols="4">1</b-col>
        <b-col cols="4">2</b-col>
      </b-row>
    </b-container>
    <h2>8、排序</h2>
    <b-container>
      <b-row class="mb-3">
        <b-col>1</b-col>
        <b-col order="5">2</b-col>
        <b-col order="1">3</b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col order="6">4</b-col>
        <b-col order="1">5</b-col>
        <b-col>6</b-col>
      </b-row>
    </b-container>
    <h2>9、偏移列</h2>
    <b-container>
      <b-row>
        <b-col md="4">md="4"</b-col>
        <b-col offset-md="4" md="4">md="4" offset-md="4"</b-col>
      </b-row>
      <b-row>
        <b-col md="3" offset-md="3">md="3" offset-md="3"</b-col>
        <b-col md="3" offset-md="3">md="3 "offset-md="3"</b-col>
      </b-row>
      <b-row>
        <b-col md="6" offset-md="3">offset-md</b-col>
      </b-row>
    </b-container>
    <h2>10、在列中使用margin辅助类</h2>
    <b-container fluid>
      <b-row class="mb-3">
        <b-col md="4" class="p-3 bg-info">md="4"</b-col>
        <b-col md="4" class="ml-auto p-3 bg-info">md="4" .ml-auto</b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col md="3" class="ml-md-auto p-3 bg-info">md="3" .ml-md-auto</b-col>
        <b-col md="3" class="ml-md-auto p-3 bg-info">md="3" .ml-md-auto</b-col>
      </b-row>
      <b-row>
        <b-col cols="auto" class="mr-auto p-3 bg-info">cols="auto" .mr-auto</b-col>
        <b-col cols="auto" class="p-3 bg-info">cols="auto"</b-col>
      </b-row>
    </b-container>
    <h2>11、嵌套网格</h2>
    <b-container>
      <b-row>
        <b-col>
          <b-row>
            <b-col cols="8" sm="6">level2: cols="8" sm="6"</b-col>
            <b-col cols="4" sm="6">level2: cols="4" sm="6"</b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <h2>12、行列</h2>
    <b-container class="mb-3">
      <b-row cols="2">
        <b-col>column</b-col>
        <b-col>column</b-col>
        <b-col>column</b-col>
      </b-row>
    </b-container>
    <b-container class="mb-3">
      <b-row cols="3">
        <b-col>column</b-col>
        <b-col>column</b-col>
        <b-col>column</b-col>
        <b-col>column</b-col>
      </b-row>
    </b-container>
    <b-container class="mb-3">
      <b-row cols="4">
        <b-col>column</b-col>
        <b-col>column</b-col>
        <b-col>column</b-col>
      </b-row>
    </b-container>
    <b-container class="mb-3">
      <b-row cols="4">
        <b-col>column</b-col>
        <b-col cols="6">cols6</b-col>
        <b-col>column</b-col>
      </b-row>
    </b-container>
    </div>
</template>

<script>
export default {
      mounted () {
      if(window.name == ""){
   console.log("首次被加载");
   window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值 
   }else if(window.name == "isReload"){
   console.log("页面被刷新");
   }
    },
    destroyed() {
      window.name=""
    }
}
</script>

<style lang="scss" scoped>
.fluid {
  background-color: red;
}
.about ::v-deep [class^="row"] {
  border: 3px black solid;
}
.about ::v-deep [class^="col"]:nth-child(odd) {
   background: red;
}

.about ::v-deep [class^="col"]:nth-child(even) {
   background: green;
}
  
</style>
