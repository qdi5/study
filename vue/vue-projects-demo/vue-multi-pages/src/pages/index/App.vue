<template>
    <div id="app">
        app vue
        <router-link to="/">index</router-link>
        <router-link to="/about">about</router-link>
        <a href="/page1">page1</a>
        <a href="/page2">page2</a>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>

</style>