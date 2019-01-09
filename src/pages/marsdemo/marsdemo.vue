<template>
  <div id="app">
    <div class="wrapper">
      <img src="@/assets/images/marsdemo/logo.png" class="logo">
      <img src="@/assets/images/marsdemo/vs.png" class="vs">
      <img src="@/assets/images/marsdemo/logo_mars.png" class="logo">
    </div>
    <router-view></router-view>
    <progress-bar></progress-bar>
  </div>
</template>

<script>
export default {
  name: 'MarsDemo'
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 750px;
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    .logo {
      width: 200px;
    }
    .vs {
      width: 50px;
    }
  }
}
</style>
