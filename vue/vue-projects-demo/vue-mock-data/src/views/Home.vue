<template>
  <div class="home">
	<h1>环境变量结合本地json模拟数据</h1> 
	<span v-if="loading">Loading...</span>
    <ul class="posts">
    	<li v-for="post in getPosts" :key="post.title" class="post-item">
			<h1>{{ post.title }}</h1>
		</li>
    </ul>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'home',
  data() {
	return {
		loading: false
	}
  },
  created() {
	this.loading = true
	  this.fetchPosts().then(post => {
		  this.loading = false
	  })
  },
  methods: {
	  ...mapActions(['fetchPosts'])
  },
  computed: {
    ...mapGetters(['getPosts'])
  }
}
</script>

<style>
	.posts {
	  list-style: none;
	  text-align: left;
	}
	.post-item + .post-item {
	  border-top: 1px solid rgba(0, 0, 0, 0.1);
	  color: red;
	}
</style>