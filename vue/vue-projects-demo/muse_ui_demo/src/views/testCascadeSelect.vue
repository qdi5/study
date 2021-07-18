<template>
	<cascade-select v-model="citys" apiUrl="/api/tblCommon/findAllShowTree"></cascade-select>
</template>

<script>
import CascadeSelect from './form'
export default {
	data() {
		return {
			citys: {
				city: '广州市',
				cityArea: '天河区',
				intentionArea: '天河中心区'
			}
		}
	},
	components: {
		CascadeSelect
	}
}
</script>

<style>
</style>
