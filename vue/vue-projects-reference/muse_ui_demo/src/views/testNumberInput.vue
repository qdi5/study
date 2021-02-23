<template>
	<number-input :max="50" v-model="goodsNumber"></number-input>
</template>

<script>
	import NumberInput from '@/base/NumberInput.vue'
	export default {
		data() {
			return {
				goodsNumber: 100
			}
		},
		components: {
			NumberInput
		}
	}
</script>

<style>
</style>
