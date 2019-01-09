<template>
  <div id="app">
    <router-view/>
    <progress-bar/>
  </div>
</template>

<script>
export default {
  name: 'Template',
  mounted () {
    this.$progress.finish();
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$progress.finish()
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
