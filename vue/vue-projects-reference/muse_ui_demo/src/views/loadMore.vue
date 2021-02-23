<template>
	<mu-container ref="container" class="article-list-wrapper">
		<mu-container class="article-list-content">
			<mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="loadMore">
			  <mu-list>
				 <mu-flex v-for="article in articleData" :key="article.id" direction="column" class="article-wrapper">
					<mu-container>
						<mu-card>
						  <mu-card-header :title="article.title">
						  </mu-card-header>
						  <mu-card-media v-if="article.img">
							<img :src="article.img">
						  </mu-card-media>
						  <mu-card-text>
							{{ article.summery }}
						  </mu-card-text>
						  <mu-card-actions>
							<mu-button flat>{{ article.typename }}</mu-button>
							<mu-button flat>{{ article.time}}</mu-button>
						  </mu-card-actions>
						</mu-card>
					</mu-container>
				 </mu-flex>
				 <mu-divider />
			  </mu-list>
			</mu-load-more>
			<div v-if="isShow" style="text-align: center;">我是有底线的~</div>
		</mu-container>
	</mu-container>
 </template>
<script>
/* 
* 抽象出一个基础的组件
* 1、上拉刷新与下拉加载可配置
* 2、渲染的数据由用户传入
* 3、渲染的结构由用户传入
* 
* */	
import { getArticleByPage } from '@/api'
export default {
	data() {
		return {
			refreshing: false,
			loading: false,
			articleData: null,
			// 当前页数
			currentPage: 1,
			// 每页显示数
			pageSize: 2,
			// 总页数
			totalPage: 0,
			// 总条数
			totalCount: 0,
			isShow: false
		}
	},
	created() {
		// 加载博客列表
		this.initData()
	},
	methods: {
		initData() {
			// 当前页数
			this.currentPage= 1
			// 每页显示数
			this.pageSize = 2
			// 总页数
			this.totalPage = 0
			// 总条数
			this.totalCount = 0
			this.isShow = false
			/* let startPage = 0 + Math.floor(Math.random()*5)
			console.log('startPage:', startPage) */
			return this.getData(1, 2).then(data => {
				
				this.articleData = data
			})
		},
		loadData(currentPage, pageSize) {
			return this.getData(currentPage, pageSize || this.pageSize).then(data => {
				// debugger
				this.articleData = this.articleData.concat(data)
			})
		},
		getData(currentPage, pageSize) {
			return getArticleByPage(currentPage, pageSize).then(result => {
				console.log('result:', result)
				let data = result.data
				this.totalCount = data.articleCount
				let articleData = data.articleData
				
				return articleData
			}).catch(error => {
				if (error) {
					throw error
				}
			})
		},
		refresh () {
		  this.refreshing = true
		  this.$refs.container.scrollTop = 0
		  this.initData().then(data => {
			  this.refreshing = false
		  })
		},
		loadMore () {
		  // alert(0)
		  console.log(++this.__index || (this.__index =1))
		  if (this.currentPage !== this.totalPage) {
			 if (!this.loading) {
				 this.loading = true
				 this.loadData(++this.currentPage).then(data => {
					this.loading= false
				 })
			}	
		  } else {
			  this.isShow = true
		  }
		}
	},
    watch: {
	  'totalCount': function (newVal, oldVal) {
		  this.totalPage = Math.ceil(newVal / this.pageSize)
	  }
    }
}

</script>

<style lang="less" scoped>
.article-wrapper {
	margin-bottom: 12px;
}
.article-list-wrapper {
	padding: 25px 0;
	
}
.article-list-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.article-list-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
