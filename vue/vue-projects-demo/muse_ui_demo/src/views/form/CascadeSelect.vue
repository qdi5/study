<template>
	<div>
		<mu-form-item label="城市">
			<mu-select class="wtf" v-model="signform.city" @change="changeCity">
				<mu-option v-for="(ct, index) in signform.cityOptions" :key="index" :label="ct.areaName" :value="ct.areaName"></mu-option>
			</mu-select>
		</mu-form-item>
		<mu-form-item label="区域">
			<mu-select class="special-select" v-model="signform.cityArea" @change="changeCityArea">
				<mu-option v-for="(contract, index) in signform.cityAreaOptions" :key="index" :label="contract.areaName" :value="contract.areaName"></mu-option>
			</mu-select>
			<mu-select class="special-select" v-model="signform.intentionArea" @change="changeIntentionArea">
				<mu-option v-for="(contract, index) in signform.intentionAreaOptions" :key="index" :label="contract.areaName" :value="contract.areaName"></mu-option>
			</mu-select>
		</mu-form-item>
	</div>
</template>
<script>
const response = require('./citysAreas.json')
export default {
	name: 'CascadeSelect',
	props: {
		apiUrl: {
			type: String,
			default: '/api/tblCommon/findAllShowTree'
		},
		// 设置默认值
		defaultValue: {
			type: Object,
			default: function() {
				return null
			}
		}
	},
	data() {
		return {
			signform: {
				city: '',
				cityOptions: [],
				cityArea: '',
				cityAreaOptions: [],
				intentionArea: '',
				intentionAreaOptions: []
				
			}
		}
	},
	// 设置默认值
	created() {
		debugger
		this.$http.get(this.apiUrl).then(response => {
			// console.log('remote data:', data)
			// debugger
			debugger
			console.log('获取到的城市区域数据：', response.map.data)
			this.dataSource = this.normalizeData(response.map.data)
			if(this.defaultValue) {
				this.init(this.defaultValue)
			} else {
				this.init()
			}
		})
		/* setTimeout(() => {
			debugger
			this.dataSource = this.normalizeData(response.map.data)
			if(this.defaultValue) {
				this.init(this.defaultValue)
			} else {
				this.init()
			}
		}, 2000) */
	},
	methods: {
		// 将数据转换成需要的格式
		normalizeData(data) {
			function getCitys() {
				let citys = []
				for (let i = 0; i < data.length; i++) {
					let item = data[i]
					if (item.parentBillNo === '0') {
						citys.push(item)
						data.splice(i, 1)
						--i
					}
				}
				return citys
			}
			// 找到城市下面的所有区域
			function dgs (citys) {
				citys.forEach(city => {
					let currentBillNo = city.billNo
					if (city.children) {
						city.children = getAllChildElesByBillNo(currentBillNo, data)
						dgs(city.children)
					}
				})
				return citys
			}
			function getAllChildElesByBillNo (currentBillNo, originData) {
				let result = []
				for (let i = 0; i < originData.length; i++) {
					let remain = originData[i]
					if (remain.parentBillNo === currentBillNo) {
					  result.push(remain)
					  originData.splice(i, 1)
					  --i
					}
				}
				return  result
			}
			return dgs(getCitys())	
		},
		// 如果有默认值，则根据默认值的城市，区，片区，找到对应的数据源
		setDefaultValue({ city: cityName, cityArea: cityAreaName, intentionArea: intentionAreaName }) {
			// 被选中的城市，所在数组的索引
			let cityIndex = this.getIndexByAreaName(this.dataSource, cityName)
			// 被选中的城市，对应的对象
			let selectedCityObj = this.dataSource[cityIndex]
			this.updateCity(this.dataSource, cityIndex)
			let selectedCityAreaArray = selectedCityObj.children
			let cityAreaIndex = this.getIndexByAreaName(selectedCityAreaArray, cityAreaName)
			this.updateCityArea(this.dataSource, cityIndex, cityAreaIndex)
			let selectedCityAreaObj = selectedCityAreaArray[cityAreaIndex]
			let selectedIntentionAreaArray = selectedCityAreaObj.children
			let intentionAreaIndex = this.getIndexByAreaName(selectedIntentionAreaArray, intentionAreaName)
			this.updateIntentionArea(this.dataSource[cityIndex].children, cityAreaIndex, intentionAreaIndex)
		},
		init(cityObj) {
			debugger
			if (cityObj && typeof cityObj === 'object') {
				this.setDefaultValue(cityObj)
			} else {
				let dataSource = this.dataSource
				this.updateCity(dataSource, 0)
				this.updateCityArea(dataSource, 0, 0)
				this.updateIntentionArea(dataSource[0].children, 0, 0)
			}
			this.sendData()
		},
		// 触发一个自定义事件，将最新的数据传递给父组件
		sendData() {
			this.$emit('getData', {
				city: this.signform.city,
				cityArea: this.signform.cityArea,
				intentionArea: this.signform.intentionArea
			})
		},
		changeCity(cityName) {
			let firstIndex = this.getIndexByAreaName(this.dataSource, cityName)
			this.updateCityArea(this.dataSource, firstIndex, 0)
			this.updateIntentionArea(this.dataSource[firstIndex].children, 0, 0)
			this.sendData()
		},
		changeCityArea(cityAreaName) {
			let secondIndex = this.getIndexByAreaName(this.signform.cityAreaOptions, cityAreaName)
			this.updateIntentionArea(this.signform.cityAreaOptions, secondIndex, 0)
			this.sendData()
		},
		changeIntentionArea() {
			console.log('改变了[片区]')
			this.sendData()
		},
		updateCity(ary, index) {
			debugger
			this.signform.cityOptions = ary
			this.signform.city = ary[index].areaName
		},
		updateCityArea(ary, firstIndex, secondIndex) {
			let cityAreaArray = ary[firstIndex].children
			this.signform.cityAreaOptions = cityAreaArray
			this.signform.cityArea = cityAreaArray[secondIndex].areaName
		},
		updateIntentionArea(ary, secondIndex, thirdIndex) {
			let intentionAreaArray = ary[secondIndex].children
			this.signform.intentionAreaOptions = intentionAreaArray
			this.signform.intentionArea = intentionAreaArray[thirdIndex].areaName
		},
		// 根据区域名获取索引
		getIndexByAreaName(targetSource, areaName) {
			if (!Array.isArray(targetSource)) {
				throw new TypeError('targetSource不是一个数组')
			}
			return targetSource.findIndex(item => {
				return item.areaName === areaName
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.special-select {
	    flex: 1!important;
	}
</style>
