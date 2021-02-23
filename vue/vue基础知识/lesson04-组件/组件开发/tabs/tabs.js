Vue.component('tabs', {
	template: `
		<div>
			<div class="tabs">
				<div class="tabs-bar">
					<div 
						:class="tabCls(item)"
						v-for="(item, index) in navList"
						@click = "handleChange(index)"
					>
						{{ item.label }}
					</div>
				</div>
				<div class="tabs-content">
					<slot></slot>
				</div>
			</div>
		</div>`,
	props: {
		// 这里的value属性是为了可以使用v-model
		value: {
			type: [String, Number]
		}
	},
	data () {
		return {
			// 因为props是单向数据流，不能直接修改父组件的value值，所以复制一份自己维护
			// 用户传入进来的需要默认显示的标签页的名字
			currentValue: this.value,
			navList: []
		}
	},
	methods: {
		getTabs () {
			// 通过遍历子组件，得到所有的pane组件
			console.log('$children', this.$children)
			return this.$children.filter(item => {
				console.log('item', item)
				console.log('$options:', item.$options)
				console.log('item.$options.name:', item.$options.name)
				return item.$options.name === 'pane'
			})
		},
		// 更新标题名
		updateNav () {
			this.navList = []
			this.getTabs().forEach((pane, index) => {
				this.navList.push({
					label: pane.label,
					name: pane.name || index
				})
				// 如果没有给pane设置name，默认设置它的索引
				if (!pane.name) {
					pane.name = index
				}
				// 设置当前选中的tab的索引
				// 如果用户没有传递当前显示的标签页，则默认设置为显示第一个标签页
				if (index === 0) {
					if (!this.currentValue) {
						this.currentValue = pane.name || index
					}
				}
			})
			this.updateStatus()
		},
		// 显示激活的pane组件，隐藏其他pane组件
		updateStatus () {
			let tabs = this.getTabs()
			// 显示当前选中的tab对应的pane组件，隐藏没有选中的
			// 这里的tabs是所有pane组件的数组集合，下面的tab.show和tab.name都是之前在pane组件里
			// 定义的props和data的属性名，这里也就是根据name是否等于当前传入进来的currentValue,
			// 设置当前pane里data数据中show的值
			tabs.forEach(tab => tab.show = tab.name === this.currentValue)
		},
		tabCls (item) {
			return [
				'tabs-tab',
				{
					// 给当前选中的tab加一个class
					'tabs-tab-active': item.name === this.currentValue
				}
			]
		},
		// 点击tab标题时触发
		handleChange (index) {
			var nav = this.navList[index]
			var name = nav.name
			// 改变当前选中的tab，并触发下面的watch
			this.currentValue = name
			// 更新value
			// 由于currentValue是从父组件拷贝过来的，所以当它变化时，
			// 需要通过自定义事件同步更新下父组件对应的数据（这里也就是activeKey）
			this.$emit('input', name)
			// 触发一个自定义事件，供父级使用
			this.$emit('on-click', name)
		}
	},
	watch: {
		value (val) {
			this.currentValue = val
		},
		// 当前激活的值更改时，pane相应的显示也需要变化，所以需要监听currentValue的变化
		currentValue () {
			// 在当前选中的tab发生变化时，更新pane的显示状态
			this.updateStatus()
		}
	}
})