<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <layout></layout>
    <router-view />
  </div>
</template>

<script>
import Layout from "./components/layout/Layout";
export default {
  components: {
    Layout
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
      color: #fff;
    }
  }
}
</style>
