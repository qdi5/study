7y<template>
	<div class="cartcontrol">
		<transition name="fadeRotate">
			<div class="cart-decrease" v-show="food.count > 0">
				<span class="icon-remove_circle_outline inner"  @click.stop="minusCart"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
		<div class="cart-add" @click.stop="addCart($event)">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import {mapState, mapMutations} from 'vuex';
export default {
	props: ['food'],
	data () {
		return {
			
		};
	},
	methods: {
		...mapMutations([
			'vxAddCart',
			'vxMinusCart'
		]),
		addCart ($event) {
			console.log($event);
			if (typeof this.food.count === 'undefined') {
				// this.$set 需要执行函数的时候传值过来，然后往传递的值里添加				
				// Vue.set 可以直接往data里或接收的数据中添加
				Vue.set(this.food, 'count', 0);
				Vue.set(this.food, 'active', true);
			}
			console.log(this.food);
			this.food.count++;
			
			if (this.food.active) {
				this.vxAddCart(this.food);
				this.food.active = false;
			}
		},
		minusCart () {
			this.food.count--;
			if (this.food.count === 0) {
				this.vxMinusCart(this.food);
			}
		}
	},
	compouted: {
		...mapState(['vxfood'])
	}
};
</script>

<style>
</style>
