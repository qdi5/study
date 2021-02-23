<template>
	<mu-container class="login" :class="{ios: isFixed}">
		<!-- model 表单数据对象 -->
		<mu-form ref="form" :model="validateForm" :auto-validate="false">
			<mu-form-item label="用户名" prop="username">
				<mu-text-field type="text" @focus="focus" @blur="deviceIsIOS && blur($event)" v-model="validateForm.username" prop="username"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="密码" prop="password">
				<mu-text-field type="password" @focus="focus" @blur="deviceIsIOS && blur($event)" v-model="validateForm.password" prop="password"></mu-text-field>
			</mu-form-item>
			<mu-flex justify-content="center">
				<mu-form-item>
					<mu-button color="primary" @click="submit">提交</mu-button>
					<mu-button @click="clear">重置</mu-button>
				</mu-form-item>
			</mu-flex>
		</mu-form>
	</mu-container>
</template>

<script>
	import { login } from '@/api'
	import { deviceIsIOS } from '@/utils'
	export default {
		data() {
			return {
				validateForm: {
					username: '',
					password: ''
					
				},
				// 验证用户名的规则
				usernameRules: [],
				// 验证密码的规则
				passwordRules: [],
				deviceIsIOS,
				isFixed: false
			}
		},
		mounted() {
			console.log('是苹果设备么？', deviceIsIOS)
		},
		methods: {
			focus(e) {
				console.log('聚焦……')
				this.isFixed = true
			},
			blur(e) {
				console.log('离开焦点', e)
				document.body.scrollTop = document.body.scrollTop
				this.isFixed = false
			},
			submit() {
				login(this.validateForm.username, this.validateForm.password).then(result => {
					console.log('登陆结果：\n', result)
					if (!result.success) {
						this.$toast.error({message: '用户名或密码错误', position: 'top'})
					} else if (result.success){
						console.log('成功登录咯：', result)
						this.$toast.success({message: '登录成功', position: 'top'})
					}
				}).catch(err => {
					console.log('err:\n', err)
					this.$toast.warning({messge: '服务器出错', position: 'top'})
				})
			},
			clear() {
				this.$toast.info({message: '清空表单', position: 'top'})
			}
		}
	}
</script>

<style lang="less" scoped>
.login {
	-webkit-user-select:auto;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(#e66465, #9198e5);
	display: flex;
	align-items: center;
	justify-content: center;
	-webkit-overflow-scrolling: auto;
	
	&.ios {
		.ios
	}
}
.ios {
	position: absolute;
}
</style>
