<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/styles.scss';

#app {
  height: 100vh;
  display: flex;
}
</style>
