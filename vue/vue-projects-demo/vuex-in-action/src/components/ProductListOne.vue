<template>
	<div id="product-list-one">
		<h2>Product List One</h2>
		<ul>
			<li v-for="product in saleProduct">
				<span class="name">{{ product.name }}</span>
				<span class="price">${{ product.price }}</span>
			</li>
		</ul>
		<button @click="reducePrice(10)">商品降价</button>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	
	export default {
		computed: {
			
			...mapGetters([
				'saleProduct'
			])
			
			// 上面的vuex写法，是以下代码的替代的简便写法
			/* saleProducts() {
				return this.$store.getters.saleProduct;
			} */
		},
		methods: {
			// 替代的简便写法
			...mapActions([
				'reducePrice'
			])
			
			// 上面的vuex写法，是以下代码的替代的简便写法
			/* reducePrice: function(amount) {
				// this.$store.commit('reducePrice');
				this.$store.dispatch('reducePrice', amount);
			} */
		}
	}
</script>

<style scoped>
	
</style>