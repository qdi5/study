<template>
  <div id="app">
	<input type="text" v-model="currentAddress" @input="handleSearch($event)" class="search">
	<baidu-map id="map"
		@dragend="syncCenterAndZoom"
		:center="center" :zoom="zoom" @ready="handler">
		<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
		 <!--
			  在右下角加入定位控件
			-->
		<bm-geolocation
		  anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
		  :showAddressBar="true"
		  :autoLocation="true"
		></bm-geolocation>
		<!-- <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
			<bm-label content="kk one购物中心" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
		</bm-marker> -->
		<div class="diy-fixed-marker">
			<span class="iconfont icon-locationon"></span>
		</div>
	</baidu-map>

	
	<!-- <baidu-map style="display: flex; flex-direction: column" @ready="handler" :center="center">
		<p style="padding: 0 10px;">以下是使用 `bm-view` 组件渲染的百度地图实例</p>
		<bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
	</baidu-map> -->
    <router-view/>
  </div>
</template>
<script>
import { debounce } from 'lodash'
	export default {
		data() {
			return {
				center: {lng: 0, lat: 0},
				zoom: 15,
				currentAddress: '',
				// 百度地图核心类
				BMap: null,
				// 地图实例
				map: null,
				// 是否是用户输入的地址
				isInputByUser: false
			}
		},
		methods: {
			handleSearch: debounce(function($event) {
				this.isInputByUser = true
				let address = $event.target.value
				debugger
				this.getPoint(address)
				
			}, 3000),
			// 地图ready事件
			handler({BMap, map}) {
				//debugger
				this.setCenter({
					lng: 114.033941,
					lat: 22.53456
				})
			    this.zoom = 15
				this.BMap = BMap
				this.map = map
			},
			// 拖拽回调函数
			syncCenterAndZoom ({target, point}) {
				this.isInputByUser = false
				// debugger
				const pcenter = target.getCenter()
			    // this.setCenter(pcenter)
			    this.zoom = target.getZoom()
				this.getAddress(pcenter)
			},
			// 设置中心点的值
			setCenter({lng, lat} = {}) {
				this.center = {lng, lat}
			},
			// 获取当前位置的地址信息
			getAddress(point) {
			    /* 创建地址解析器的实例 */
			    let geoCoder = new this.BMap.Geocoder();
				geoCoder.getLocation(point, res=>{
					// debugger
					console.log('res:\n', res)
				  let { address } = res
				  // 如果是输入的地址，则不重新赋值
				  if (this.isInputByUser === false) {
				      this.currentAddress = address	  
				  }
				  console.log('获取的位置信息：',res);
				})
			},
			// 根据地址信息，获取经纬度
			getPoint(address) {
				let geoCoder = new this.BMap.Geocoder();
				geoCoder.getPoint(address, point => {
					console.log('point:',point)
				   this.setCenter(point)
				});
			}
		},
		watch: {
			center(newValue, oldValue) {
				// debugger
				if (newValue.lng === oldValue.lng && newValue.lat === oldValue.lat) {
					return
				}
				// 如果是用户手动输入的地址，则不重新设置新的地址？
				this.getAddress(new this.BMap.Point(newValue.lng, newValue.lat))
			}
		}
	}
</script>
<style lang="stylus">
body,html
  height: 100%
  min-height: 100%
#app
  position: relative
  height: 100%
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
	
#map
	position: absolute;
	top: 100px;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%
	background: red
	.diy-fixed-marker
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%)
		margin: auto;
		.icon-locationon
			color: #000
.search
	width: 80%;
	margin: 15px 0;
</style>
