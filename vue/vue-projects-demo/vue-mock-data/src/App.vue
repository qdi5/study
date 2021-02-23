<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">json mock</router-link> |
      <router-link to="/about">mockjs</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import 'normalize.css'
export default {}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
