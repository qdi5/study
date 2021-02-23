<template>
<div class="daily-article" ref="articleDetail">
	<div class="daily-article-title">{{ data.title }}</div>
	<div class="daily-article-content" v-html="data.body"></div>
	
	<div class="daily-comments" v-show="comments.length">
		<span>评论({{ comments.length }})</span>
		<div class="daily-comment" v-for="comment in comments" :key="comment.author">
			<div class="daily-comment-avatar">
				<img :src="comment.avatar" alt="" />
			</div>
			<div class="daily-comment-content">
				<div class="daily-comment-name">
					{{ comment.author }}
				</div>
				<div class="daily-comment-time" v-time="comment.time*1000"></div>
				<div class="daily-comment-text">
					{{ comment.content }}
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import $ from '../libs/util.js';
import '../less/daily-article.less';
export default {
	props: {
		id: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			data: {},
			comments: []
		};
	},
	methods: {
		
		// 获取文章详情
		getArticle () {
			$.ajax.get('news/' + this.id).then(res => {
				console.log('获取文章详情页：', res);
				// 将文章中的图片地址替换为代理地址
				res.body = res.body.replace(/src="http/g, 'src="' + $.apiUrl.imgPath + 'http');
				res.body = res.body.replace(/src="https/g, 'src="' + $.apiUrl.imgPath + 'https');
				this.data = res;
				// 返回文章顶端
				console.log(this.articleDetail);
				this.$refs.articleDetail.scrollTop = 0;
				// 获取评价
				this.getComments();
			});
		},
		
		// 获取当前文章的评论
		getComments () {
			this.comments = [];
			$.ajax.get('story/' + this.id + '/short-comments').then(res => {
				this.comments = res.comments.map(comment => {
					// 将头像的图片地址转为代理地址
					comment.avatar = $.apiUrl.imgPath + comment.avatar;
					return comment;
				});
			});
		}
	},
	
	// 监听数据id的变化，重新请求新的数据
	watch: {
		id (val) {
			if (val) this.getArticle();
		}
	}
};
</script>

<style>
</style>
