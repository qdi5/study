<template>
	<div>
		<van-password-input
		  :value="value"
		  :mask="false"
		  :length="maxLength"
		  :focused="showKeyboard"
		  @focus="showKeyboard = true"
		/>
		<van-number-keyboard
		  :show="true"
		  @blur="show = false"
		  @input="onInput"
		  @delete="onDelete"
		  v-model="value"
		  :maxlength = "maxLength"
		  safe-area-inset-bottom
		/>
	</div>
 </template>

<script>
import { NumberKeyboard, Toast, Field, PasswordInput } from 'vant'

export default {
	data () {
		return {
			value: '',
			maxLength: 6,
			showKeyboard: true
		}
	},
	methods: {
		// 正在输入的事件
		onInput(value) {
		  Toast(value);
		},
		// 删除的事件
		onDelete() {
		  Toast('删除');
		}
	},
	components: {
		[NumberKeyboard.name]: NumberKeyboard,
		[Field.name]: Field,
		[PasswordInput.name]: PasswordInput
	},
	watch: {
		value (newVal) {
			if (newVal.length === this.maxLength) {
				Toast('开始请求后端接口啦，验证验证码是否正确')
			}
		}
	}
}
</script>

<style>
</style>
