<template>
  <el-row>
  		<el-col :span="24">
  			<h1 class="title">{{ header }}<small>{{ subHeader }}</small></h1>
  		</el-col>
  </el-row>
</template>

<script>
export default {
    props: ['header', 'subHeader']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
