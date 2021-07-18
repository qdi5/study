<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>

import { getBanner } from '@/api'
export default {
  name: 'app',
	created() {
		getBanner().then(data => {
			console.log('data:\n', data)
		})
	}
}
</script>

<style>
</style>
