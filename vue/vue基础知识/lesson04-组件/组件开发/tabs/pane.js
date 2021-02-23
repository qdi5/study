Vue.component('pane', {
	name: 'pane',
	template: `
		<div class="pane" v-show="show">
			<slot></slot>
		</div>
	`,
	props: {
		// 标识当前pane，不是必须
		name: {
			type: String
		},
		// 标签页标题
		label: {
			type: String,
			default: ''
		}
	},	
	data () {
		return {
			show: true
		}
	},
	methods: {
		updateNav () {
			// 访问父组件的实例，并调用父组件实例的updateNav方法
			this.$parent.updateNav()
		}
	},
	// 当label变化时，通知父组件更新标签标题
	watch: {
		label () {
			this.updateNav()
		}
	},
	// 初始化时候，将标签标题传递给父组件
	mounted () {
		this.updateNav()
	}
})