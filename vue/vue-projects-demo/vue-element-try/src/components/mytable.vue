<template>
	<el-table
	ref="multipleTable"	
	:data="dynamicBooksData"
	style="width: 100%" 
	row-class-name="table-header" 
	:header-cell-style="headerStyle" 
	@selection-change="handleSelectionChange"
	@select-all="handleSelectAll"
	>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column
			prop="name"
			label="书名"
			width="320"
			class-name="author-bottom"
			sortable
			>
			    <template slot-scope="scope">
						<el-tooltip effect="dark" :content="scope.row.name" placement="top">
						    <div style="margin-bottom: 20px;">{{ scope.row.name }}</div>	
						</el-tooltip>
						<div class="author-wrap">{{ scope.row.authors | formatAuthors }}</div>
					</template>    	
			</el-table-column>
			<el-table-column
			prop="summary"
			label="简介"
			align="left"
			width="300"
			>
				<template slot-scope="scope">
					<div >
						{{ scope.row.summary | formatSummary }}
					</div>
				</template>
			</el-table-column>
			<el-table-column
			prop="category"
			label="类别"
			>
		</el-table-column>
		<el-table-column
		prop="published"
		label="出版日期"
		
		>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		props: ['headerStyle', 'handleSelectionChange', 'handleSelectAll', 'dynamicBooksData'],
		filters: {
			// 格式化作者
			formatAuthors(val) {
				return val.join(',');
			},
			// 格式化简介
			formatSummary(val) {
				if (val.length > 100) {
					val = val.substr(0, 100) + '......';
				}
				return val;
			}
		}
	}
	
</script>

<style scoped>
	.author-bottom {
		position: relative;
	}
	.author-bottom .author-wrap {
		position: absolute;
		left: 0;
		right: 0;
		margin: 20px auto auto auto;
		bottom: 10px;
	}
	
</style>