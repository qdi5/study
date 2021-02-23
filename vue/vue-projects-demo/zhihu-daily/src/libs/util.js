import axios from 'axios';

// 基本配置
const Util = {
	apiUrl: {
		imgPath: 'http://127.0.0.1:8013/img/',
		apiPath: 'http://127.0.0.1:8012/',
		beforeNewsApi: 'news/before/'
	},
	
	// 给小于10的数字添加前缀 '0'
	addPrefixZeroString: function (num) {
		return num < 10 ? '0' + num : num;
	},
	
	dates: {}
	
};

// ajax通用配置
Util.ajax = axios.create({
	baseURL: Util.apiUrl.apiPath
});

// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
	return res.data;
});

// 获取今日0点的时间戳
Util.dates.getAm12Timestamp = function () {
	const date = new Date();
		
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date.getTime();
};

// 转换时间戳为日期
Util.dates.convertTimestampToDate = function (timestamp) {
	const date = new Date(timestamp);
	const year = date.getFullYear(); // 获取年份
	// 获取月份
	const month = Util.addPrefixZeroString(date.getMonth() + 1);
	const day = Util.addPrefixZeroString(date.getDate());
	// const hours = Util.addPrefixZeroString(date.getHours());
	// const minutes = Util.addPrefixZeroString(date.getMinutes());
	// const seconds = Util.addPrefixZeroString(date.getSeconds());
	// return year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;
	return year + '' + month + '' + day;
};

// 转换字符串为日期
Util.dates.convertDateStrToDate = function (strDate, s1, s2) {
	let d = strDate.split(' ');
	let	d1 = d[0];
	let	d2 = d[1];
	let	D1 = d1.split(s1 || '-');
	let	D2 = d2.split(s2 || ':');
	
	return new Date(
		D1[0] || 0,
		parseInt(D1[1]) - 1 || 0,
		D1[2] || 1,
		D2[0] || 0,
		D2[1] || 0,
		D2[2] || 0
	);
};

Util.dates.time = {
	// 获取当前时间戳
	getUnix: function () {
		var now = new Date();
		return now.getTime();
	},
	// 获取今天0点0分0秒的时间戳
	getTodayUnix: function () {
		var now = new Date();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);
		return now.getTime();
	},
	// 获取今年1月1日0点0分0秒的时间戳(今年第一天零点的时间戳)
	getYearUnix: function () {
		var now = new Date();
		now.setMonth(0);
		now.setDate(1);
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);
		return now.getTime();
	},
	// 获取标准年月日
	getStandardDate: function (time) {
		var now = new Date();
		var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
		var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
		return now.getFullYear() + '-' + month + '-' + day;
	},
	// 转换时间
	getFormatTime: function (timestamp) {
		debugger;
		var now = this.getUnix(); // 当前时间戳
		var today = this.getTodayUnix(); // 今天0点时间戳
		// var year = this.getYearUnix(); // 今年第一天0点时间戳
		// 转换为秒级时间戳
		var timer = (now - timestamp) / 1000;
		
		
		console.log(timestamp, timer);
		var tip = ' ';
		
		if (timer <= 0) { // timer小于0的情况：本地时间被调到过去某一个时间了，导致timer为负数
			tip = '刚刚';
		} else if (Math.floor(timer / 60) <= 0) {
			tip = '刚刚';
		} else if (timer < 3600) { // 相差时间小于1小时
			tip = Math.floor(timer / 60) + '分钟前';
		} else if (timer >= 3600 && timestamp - today >= 0) { // timestamp - today >=0确保时间戳是今天的时间
			tip = Math.floor(timer / 3600) + '小时前';
		} else if (timer / 86400 <= 31) {
			tip = Math.ceil(timer / 86400) + '天前';
		} else {
			tip = this.getStandardDate(timestamp);
		}
		
		return tip;
	}
};
export default Util;

