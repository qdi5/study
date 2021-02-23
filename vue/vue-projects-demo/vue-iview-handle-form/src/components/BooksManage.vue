<template>
  <div class="books-manage">
  	<!-- 页头 -->
  		<!-- 工具栏 -->
  			<!-- 图书统计 -->
  			<!-- 搜索框 -->
  			<!-- 按钮组 -->
  		<!-- 工具栏 -->
  	<!-- 页头 -->
		<header>
			<Row>
				<Col span="24">
					<div class="page-header">
						<h1>
							图书<small>Vue CRUD示例</small>
						</h1>
					</div>
				</Col>
			</Row>	 
		</header>
  	
  	
  	<!-- 正文 -->
  		<!-- 图书数据表格 -->
  	<!-- 正文 -->
  	<div class="content">
  		<Row class="container">
  			<Col span="18">
					<Col span="12">
						<span class="book-count">共有{{bookData.length}}本图书</span>
					</Col>
					<Col span="12">
						<div>
							<div class="search-input">
								<Icon type="search" class="search-icon" size="22" color="#999"></Icon>
								<input type="text" placeholder="请输入您要筛选的书名" class="search-content ivu-input" />
							</div>
						</div>
					</Col>
  			</Col>
  			<Col span="6" >
  				<Row type="flex" justify="end">
  					<Button type="error" class="btn-error" v-show="checked">
  						<Icon type="android-delete" color="white"></Icon>
  					</Button>
  					<Button type="primary">
  						<Icon type="plus"></Icon>
  					</Button>
  				</Row>
  			</Col>
  		</Row>
  		<Table border :columns="columns1" :data="bookTableData"></Table>
  		<div class="page-wrap">
  			<Page :total = "total" :current="currentPage" class-name="page-style" @on-change="changePage"></Page>
  		</div>
  	</div>
  	
  	<!-- 对话框 -->
  	
  	<!-- 对话框 -->
  </div>  
</template>

<script>
import data1 from '../assets/booksData.json'
export default {
  name: 'HelloWorld',
  data () {
    return {
    	bookData: [],
    	// 当前页
    	currentPage: 1,
    	// 每页显示几条
    	pageSize: 10,
    	// 总数据
    	total: 0,
    	// 标识是否勾选了书籍
    	checked: false,
    	// 搜索关键字
    	keywords: '',
    	columns1: [
    				{
    					type: 'selection',
    					width: 60,
    					align: 'center'
    				},
            {
                title: '书名',
                key: 'name',
                render: (h, params) => {
                	return h('div', [h('div', params.row.name),h('div', params.row.authors[0])])
               }, 
                filters: [{
                	label: 'Excel',
                	value: 1
                }],
                filterMultiple: false, 
                filterMethod(value, row) {
                
                		return row.name.indexOf('Excel') > -1;
                }
            },
            {
                title: '类别',
                key: 'category'
            },
            {
                title: '出版日期',
                key: 'published'
            }
        ],
        bookTableData: []
    }
  },
  methods: {
  	// 分页逻辑
  	changePage(currentPage) {
  		if (typeof currentPage !== 'undefined') {
  			currentPage && (this.currentPage = currentPage);
  		}
  		
      let startPage = (this.currentPage - 1) * this.pageSize;
      let endPage = startPage + this.pageSize;
      this.bookTableData = Array.prototype.slice.call(this.bookData, startPage,  endPage);
  	}
  },
  mounted() {
  		this.bookData = Array.prototype.slice.call(data1, 0);
  		this.total = this.bookData.length;
  		this.changePage();
  },
  computed: {
  	// 搜索图书
  	searchBooks() {
  		
  	}
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../less/book.less";
</style>
