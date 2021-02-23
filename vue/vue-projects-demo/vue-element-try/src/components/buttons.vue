<template>
	<div>
		<div class="text-align-right">
		    <el-button v-show="checkedNum > 0" type="danger" size="mini" class="btn-square" icon="el-icon-delete" @click="handleDeleteBooks"></el-button>
		    <el-button type="primary" size="mini" class="btn-square" icon="el-icon-plus" @click="dialogFormVisible=true;"></el-button>		
		</div>
		
		<el-dialog title="添加新的图书" @close="handleDialogClose" :visible.sync="dialogFormVisible" class="dialog-wrapper">
			<el-tabs type="border-card">
				<el-tab-pane label="通用">
					<el-form :model="form" ref="form">
						<el-form-item label="书名" :error="errorBags.first('name')" :label-width="formLabelWidth" prop="name">
							<el-input v-model="form.name"  auto-complete="off" v-validate="'required'" data-vv-as="书名" name="name"></el-input>
						</el-form-item>
						
						<el-form-item label="书号" :error="errorBags.first('isbn')" :label-width="formLabelWidth" prop="isbn">
							<el-input v-model="form.isbn" auto-complete="off" v-validate="{ required: true, regex: /^[0-9]{3}-[0-9]{1}-[0-9]{3}-[0-9]{5}-[0-9]{1}$/}" data-vv-as="书号" name="isbn"></el-input>
						</el-form-item>
						
						<el-form-item label="售价" :error="errorBags.first('price')" :label-width="formLabelWidth" prop="price">
							<el-input v-model="form.price" auto-complete="off" v-validate="{required: true,regex:/^[1-9](\d+)?(\.\d+)?$/}" data-vv-as="售价" name="price"></el-input>
						</el-form-item>
						
						<el-form-item label="出版日期" :error="errorBags.first('published')" :label-width="formLabelWidth" prop="published">
							<el-date-picker v-model="form.published" type="date" placeholder="选择日期" v-validate="{required: true, date_format: 'yyyy-mm-dd'}" data-vv-as="出版日期" name="published"></el-date-picker>
						</el-form-item>
						 <!-- el-checkbox必须被el-checkbox-group包裹，否则无法使用vee-validatea验证，暂时不知道原因 -->
					   <el-form-item label=""  :label-width="formLabelWidth" prop="status">
							 <el-checkbox-group :error="errorBags.first('stat')"   v-model="status"  data-vv-name="stat" v-validate="'required'"  data-vv-as="上市销售">
							     <el-checkbox name="stat">上市销售</el-checkbox>	 
							 </el-checkbox-group>
						</el-form-item>
						
						<el-form-item label="页数" :error="errorBags.first('pages')" :label-width="formLabelWidth" prop="pages">
							<el-input v-model="form.pages" auto-complete="off" v-validate="{ required: true, regex: /^[1-9][0-9]+$/}" data-vv-as="页数" name="pages"></el-input>
						</el-form-item>
						
						<el-form-item label="作者" :error="errorBags.first('authors')" :label-width="formLabelWidth" prop="authors">
							<el-input v-model="authors" auto-complete="off" v-validate="{ required: true, regex: /^(([\u4e00-\u9fa5a-zA-Z+\s?],?)+)$/ }" data-vv-as="作者" name="authors"></el-input>
						</el-form-item>
						
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="摘要" >
					<quill-editor v-model="form.summary"
						ref="myQuillEditor"
						:options="editorOption"
						:error="errorBags.first('summary')"
						v-validate="'required'"
						name="summary"
						data-vv-as="摘要"
						
						>
					</quill-editor>
					<!-- 当错误中包含了摘要的错误时候，显示错误 -->
					<div v-show="errorBags.has('summary')" style="color: #f56c6c;">{{ errorBags.first('summary') }}</div>
				</el-tab-pane>
			</el-tabs>
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取消</el-button>
				<el-button  native-type="submit" @click="handleSubmit">确定</el-button>
				<el-button @click="restForm">重置</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
// 引入富文本编辑器	
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
	props: ['checkedNum', 'originData', "checkedBooks"],
	data() {
		return {
			dialogFormVisible: false,
			form: {
				name: '',
				isbn: '',
				price: '',
				published: '',
				pages: '',
				authors: [],
				status: '',
				summary: '',
				// 类别
				category: []
			},
			formLabelWidth: '120px',
			editorOption: {}
		}
	},
	methods: {
		
		// 处理删除图书的点击事件
		handleDeleteBooks() {
				let content='是否删除这本书？';
				if (this.checkedBooks.length > 1) {
					content = '是否删除这' + this.checkedBooks.length + '本书？'
				}
				this.$confirm(content, '警告', {
					type: 'warning'
				}).then(() => {
					this.deleteBooks();
					this.checkedBooks.length = 0;
					this.$message({
						type: 'success',
						message: '删除成功！'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					})
				})
		},
		
		// 删除书籍
		deleteBooks() {
			let originData = this.originData;
			let checkedBooksData = this.checkedBooks;
			
			for (let book of checkedBooksData) {
				var delBookId = book['isbn'];
				for (let bk in originData) {
					if(originData[bk]['isbn'] === delBookId){
						originData.splice(bk, 1);
					}
				}
			}
		},
		// 添加书籍
		handleAddBook() {
			 const bookObj = {};
			 const loading = this.$loading({
				 text: 'Loading',
				 spinner: 'el-icon-loading'
			 });
			 
			 bookObj['name'] = this.form.name;
			 bookObj['isbn'] = this.form.isbn;
			 bookObj['price'] = this.form.price;
			 
			 // 必须要转换为字符串，否则在el-table中渲染不出来
			 bookObj['published'] = this.form.published.toLocaleDateString();
			 bookObj['status'] = this.form.status;
			 bookObj['pages'] = this.form.pages;
			 bookObj['authors'] = this.form.authors;
			 bookObj['summary'] = this.form.summary;
			 bookObj['category'] = '励志成功';
			 
			 this.originData.push(bookObj);
			 setTimeout(() => {
				 this.dialogFormVisible = false;
				 loading.close();
			 }, 3000);
			 
		},
		// 处理添加书籍的提交
		handleSubmit() {
			this.$validator.validateAll().then(result => {
				// 提交成功
				if (result) {
					this.handleAddBook();
				} else {
					// 提交失败
					
				}
			})
		},
		// 重置表单
		restForm() {
			this.$refs['form'].resetFields();
			
			// 防止错误还没出现就已经执行清除了；
			setTimeout(() => {
				this.errorBags.clear();
			}, 0);
			
			this.$refs.myQuillEditor.quill.deleteText(0, this.$refs.myQuillEditor.quill.getLength());
			
		},
		// 处理dialog关闭时的函数
		handleDialogClose() {
			this.restForm();
			
		}
	},
	computed: {
		authors: {
			
			// 获取作者时候，转换为以逗号分割的字符串
			get() {
				
				let result = this.form.authors.length > 1 ? this.form.authors.join(',') : (this.form.authors[0] || '');
				
				return result;
			},
			// 设置作者的时候，转换为数组
			set(val) {
				console.log('赋值');
				if (val.indexOf(',') > -1) {
					this.form.authors = val.split(',')
				} else {
					this.form.authors = [val];
					
				}
			}
		},
		status: {
			// 获取状态的时候转换为 true或 false
			get() {
				let status = this.form.status;
				console.log("status", status);
				return this.form.status ? true : false;
			},
			set(val) {
				this.form.status = val ? '上市销售' : '';
			}
		}
	},
	components: {
		quillEditor
	}
	
}

</script>

<style>
.dialog-wrapper .el-tabs__nav-wrap {
	margin-bottom: -2px;
}	
</style>