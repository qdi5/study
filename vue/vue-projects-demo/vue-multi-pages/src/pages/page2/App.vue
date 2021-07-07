<template>
    <div id="app">
        index app
        <router-link :to="{name: 'page2-2'}">page2-2</router-link>
        <router-view></router-view>
        <no-result></no-result>
    </div>
</template>

<script>
import NoResult from 'components/base/NoResult.vue'
export default {
    name: 'App',
    components: {
        NoResult
    }
}
</script>

<style>

</style>