// 判断是不是合法的数字（感觉还是有错误，比如 0.00也可以）
function isValueNumber (value) {
	return (/(^-?[0-9]+\.\d+$)|(^-?[1-9][0-9]*$)|(^-?0$)/).test(value + '')
}
Vue.component('input-number', {
	template: `,
		<div class="input-number">
			<input :value="currentValue" @change="handleChange"/>
			<input type="button" @click="reduce" value="-" :disabled="currentValue<=min" />
			<input type="button" @click="increase" value="+" :disabled="currentValue>=max" />
		</div>
	`,
	props: {
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		value: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			currentValue: this.value
		}
	},
	methods: {
		// 不管是减，还是加，最终都需要判断是否修改currentValue.
		// 所以，可以抽离出一个公用方法，用于判断是否执行修改
	    reduce () {
			let nowValue = this.currentValue - 1
			this.updateValue(nowValue)
		},
		increase () {
			let nowValue = this.currentValue + 1
			this.updateValue(nowValue)
		},
		// 确保currentValue在正常范围内
		updateValue (newValue) {
			if (newValue > this.max) {
				newValue = this.max
			}
			if (newValue < this.min) {
				newValue = this.min
			}
			this.currentValue = newValue
		},
		handleChange (event) {
			let val = event.target.value.trim()
			debugger
			// 判断是不是合法的数字
			if (isValueNumber(val)) {
				val = Number(val)
				this.updateValue(val)
			} else {
				event.target.value = this.currentValue
			}
		}
	},
	watch: {
		// 监听当前组件的currentValue，实时同步给父组件的value
		currentValue (val) {
			this.$emit('input', val)
			// this.$emit('on-change', val)
		},
		// 监听父组件的value值，实时同步给当前子组件的currentValue
		value (val) {
			this.updateValue(val)
		}
	},
	// 第一次初始化时，对value进行过滤，防止父组件传入进来的数据不在范围内
	mounted () {
		this.updateValue(this.value)
	}
})