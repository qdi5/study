<template>
  <div class="hello">
	<dl>
		<dt>url: {{ url }}</dt>
		<dd>title: {{ title }}</dd>
	</dl>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
	  return {
		  url: process.env.VUE_APP_URL,
		  title: process.env.VUE_APP_TITLE 
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
