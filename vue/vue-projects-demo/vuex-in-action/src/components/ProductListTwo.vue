<template>
	<div id="product-list-one">
		<h2>Product List Two</h2>
		<ul>
			<li v-for="product in saleProducts">
				<span class="name">{{ product.name }}</span>
				<span class="price">${{ product.price }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
	
	export default {
		computed: {
			saleProducts() {
				return this.$store.getters.saleProduct;
			},
			...mapGetters(['saleProduct'])
		}
	}
</script>

<style scoped>
	
</style>