<template>
		<div class="daily">
			<div class="daily-menu">
				<div class="daily-menu-item" :class="{on: type === 'recommend'}" @click="handleToRecommend">每日推荐</div>
				<div class="daily-menu-item" :class="{on: type === 'daily'}" @click="showThemes=!showThemes">
					主题日报
				</div>
				<ul v-show="showThemes">
						<li v-for="item in themes" :key="item.id">
							<a :class="{on: item.id === themeId && type === 'daily'}" @click="handleToTheme(item.id)">{{ item.name }}</a>
						</li>
				</ul>
			</div>
			<div class="daily-list" ref="list" @scroll="handleScroll">
				<!-- 这里渲染list自定义组件有两种情况，一种是每日推荐的布局；一种是主题日报的布局 -->
				<template v-if="type === 'recommend'">
				    <div v-for="item in recommendList" :key="item.date">
				    	<div class="daily-date">{{ item.date | formatDate }}</div>
				    	<list v-for="story in item.stories" :data="story" :key="story.id" @click.native="handleClick(story.id)"></list>
				    </div>
				    
				</template>
				<!-- 这里是主题日报的布局  -->
				<template v-if="type === 'daily'">
						 <list v-for="daily in list" :data="daily" :key="daily.id" @click.native="handleClick(daily.id)"></list>
				</template>
			</div>
			<daily-article :id="articleId"></daily-article>
		</div>
</template>

<script>
import $ from '../libs/util';
import list from './list';
import dailyArticle from './daily-article';
export default {
	data () {
		return {
			themes: [],
			
			// 当前主题下的列表数据
			list: [],
			showThemes: false,
			type: 'recommend',
			// 推荐列表数据
			recommendList: [],
			// 获取今日0点时间戳
			dailyTime: $.dates.getAm12Timestamp(),
			isLoading: false,
			themeId: 0,
			articleId: 0
		};
	},
	methods: {
		getThemes () {
			$.ajax.get('themes').then(res => {
				this.themes = res.others;
			});
		},
		// 切换不同日报主题
		handleToTheme (id) {
			this.themeId = id;
			this.type = 'daily';
			this.list = [];
			// 获取当前主题下的所有文章
			$.ajax.get('theme/' + id).then(res => {
				// 过滤掉类型为1的文章，该类型下的文章为空
				this.list = res.stories.filter(item => item.type !== 1);
				console.log(this.list);
			});
		},
		
		// 切换到每日推荐
		handleToRecommend () {
			this.type = 'recommend';
			this.recommendList = [];
			this.dailyTime = $.dates.getAm12Timestamp();
			this.getRecommendList();
		},
		
		// 获取每日推荐的数据
		getRecommendList () {
			this.isLoading = true;
			console.log();
			
			let initDailyTime = $.dates.convertTimestampToDate(this.dailyTime);
			// 推荐列表api的查询日期比真实日期多一天，所以今日时间需要加上 (24*60*60*1000) = 86400000毫秒
			const requestDate = $.dates.convertTimestampToDate(this.dailyTime + (24 * 60 * 60 * 1000));
			$.ajax.get($.apiUrl.beforeNewsApi + requestDate).then(res => {
				console.log(res);
				// 解决当天日期下没有数据时候，重复渲染前一天的数据的bug;
				if (initDailyTime !== res.date) {
					let dateStr = res.date;
					let year = dateStr.slice(0, 4);
					let month = dateStr.slice(4, 6);
					let day = dateStr.slice(6);
					let newDailyTime = $.dates.convertDateStrToDate(`${year}-${month}-${day} 00:00:00`);
					console.log('newDailyTime', newDailyTime);
					console.log('newDailyTime', newDailyTime.getTime());
					this.dailyTime = newDailyTime.getTime();
				}
				this.recommendList.push(res);
				this.isLoading = false;
				console.log(this.recommendList);
			});
		},
		
		handleScroll () {
			// 获取DOM
			const listDomObj = this.$refs.list;
			// 绑定中栏的滚动事件;使用监听时要注意在beforeDestroy声明周期使用removeEventListener移除
			listDomObj.addEventListener('scroll', () => {
			    // 在"主题日报"或正在加载推荐列表时候不执行此函数
			    if (this.type === 'daily' || this.isLoading) return;
			    
			    // 已经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
			    let scrolledDistance = listDomObj.scrollTop; // 已经滚动的距离
			    let pageHeight = document.body.clientHeight; // 页面高度
			    let contentHeight = listDomObj.scrollHeight; // 内容区域高度
			   	if (scrolledDistance + pageHeight + 100 > contentHeight) {
			   		// 时间相对减少一天
			   		this.dailyTime -= (24 * 60 * 60 * 1000);
			   		this.getRecommendList();
			   	}
			});
		},
		handleClick (articleId) {
			this.articleId = articleId;
		}
	},
	filters: {
		// 格式化日期
		formatDate (date) {
			console.log(date);
			let year = date.substr(0, 4);
			let month = date.substr(4, 2);
			let day = date.slice(6);
			
			return `${year}年${month}月${day}日`;
		}
	},
	mounted () {
		this.getThemes(); // 获取主题日报下的列表
		this.getRecommendList(); // 获取每日推荐列表
	},
	components: {
		list,
		'daily-article': dailyArticle
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>



