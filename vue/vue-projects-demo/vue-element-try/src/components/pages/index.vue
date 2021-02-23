<template>
	<view-page title="图书" sub-title="Vue CRUD示例">
			<div slot="counting">
					<counting :total-num="originData.length" :checked-num="checkedBooks.length"></counting>		
			</div>
			
			<div slot="search">
				<search-box @search='handleSearch' placeholder="请输入您要筛选的书名" :keywords="keywords"></search-box>
			</div>
			
			<div slot="buttons">
				<buttons :checked-num="checkedBooks.length" :origin-data='originData' :checked-books="checkedBooks"></buttons>
			</div>
			
			<div slot="pagination">
				<pagination :total = "total" :page-size="pageSize" :current-page = "currentPage" :changePage = "changePage"></pagination>
			</div>
			<div slot="mytable">
				<my-table :dynamic-books-data="dynamicBooksData" :header-style="headerStyle" :handle-select-all="handleSelectAll" :handle-selection-change="handleSelectionChange"></my-table>
			</div>
			
	</view-page>
</template>

<script>

import searchBox from '../searchBox'
import counting from '../counting'
import buttons from '../buttons'
import pagination from '../pagination'
import myTable from '../mytable'
import viewPage from '../layers/viewpage'
import booksData from '../../assets/booksData.json'	
export default {
    data() {
      return {
      	headerStyle: { 'text-align': 'center' },
      	// 原始书籍数据
        originData: [],
        
        // 筛选后的数据
        filteredDates: [],
        
        // 最终分页后的数据
        finalDatas: [],
	    	// 当前页
	    	currentPage: 1,
	    	// 每页显示几条
	    	pageSize: 10,
	    	// 总数据
	    	total: 0,
	    	
	    	// 搜索关键字
	    	keywords: '',
        // 选择的书籍数据        
        checkedBooks: []
      }
    },
    components: {
    	searchBox,
			counting,
			buttons,
			pagination,
			viewPage,
			myTable
    },
    
    	methods: {
		  		// 分页逻辑
		  	  changePage(currentPage) {
				  		if (typeof currentPage !== 'undefined') {
				  			currentPage && (this.currentPage = currentPage);
				  		}
				      let startPage = (this.currentPage - 1) * this.pageSize;
				      let endPage = startPage + this.pageSize;
				      return {startPage, endPage};
		  	  },
		  	  // 获取当前页数据
		  	  getCurrentPageData({startPage, endPage}, filteredData) {
		  	  	
		  	  	return Array.prototype.slice.call(filteredData, startPage,  endPage);
		  	  },
		  	  // 搜索图书
		  	  filterBooks(originData) {
		  	  	return originData.filter((current, index) => {
			  		 	 return (current.name.toLowerCase().indexOf(this.keywords)) > -1;
			  	 });
		  	  },
		  	  // 重置当前页为 1
		  	  resetCurrentPage() {
		  	  	this.currentPage = 1;
		  	  },
		  	  // 获取图书数据
		  	  getBookData(originData) {
		  		    this.filteredData = this.filterBooks(originData);
			  	    this.total = this.filteredData.length;
			  	    return this.getCurrentPageData(this.changePage(this.currentPage), this.filteredData);
		  		},
		  		// 处理复选框勾选事件
		  		handleSelectionChange(selection){
						this.checkedBooks = selection;
		  		},
		  		// 处理表格头的复选框全选事件
				handleSelectAll(selection) {
				  	this.checkedBooks = selection;
				},

				// 处理自定义事件
				// 处理自定义事件search，接收子组件传递过来的值
				handleSearch(keywords) {
					console.log('keywords', keywords);
					this.resetCurrentPage();
					this.keywords = keywords;
				}
  		},
  		mounted() {
  			this.originData = Array.prototype.slice.call(booksData, 0);
  		},
  		// 希望哪些数据变动能触发对应的行为；
		  computed: {
		  	  dynamicBooksData(){
		  	  	 
		  	  	return this.getBookData(this.originData);
		  	  }
		  }
  }	
</script>

<style>
</style>