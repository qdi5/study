<template>
    <div id="app">
        page1 app
        <router-view></router-view>
        <router-link to="/about">about</router-link>
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