<template>
	<div>
		<div>{{cart}}</div>
		<div>{{ vxcart }}</div>
	</div>

</template>

<script>
import {mapState} from 'vuex';
export default {
	props: ['cart'],
	computed: {
		...mapState(['vxcart'])
	}
};
</script>

<style>
</style>
