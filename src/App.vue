<template>
  <div id="app">
    <tab-bar></tab-bar>
    <router-view />
  </div>
</template>

<script>
import TabBar from 'components/content/TabBar/TabBar.vue';

export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
body{
  min-width: 1100px;
}


</style>
