<template>
  <div class="hello">
    <!--
      visible-change： 下拉框出现/隐藏时触发
      change：当选中节点变化时触发
    -->
    <el-cascader
      popper-class="regionList"
      placeholder="区域"
      :options="optionsArea"
      @change="handleAreaChange"
      :props="props"
      v-model="selectedCity"
      @visible-change="areaVisibleChange"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      optionsArea: [{ label: '深圳', value: 'shenzhen' }, { label: '广州', value: 'guangzhou' }],
      props: {
        value: 'label',
        children: 'cities'
      },
      selectedCity: []
    }
  },
  methods: {
    handleAreaChange (val) {
      console.log('areaChange:', val)
    },
    areaVisibleChange (val) {
      console.log('visibleChange:', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
