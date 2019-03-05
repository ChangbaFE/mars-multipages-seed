<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-primary" @click="showProgressBar">
        showProgressBar
      </button>
      <button class="btn btn-primary" @click="goIndex">
        Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {}
  },
  computed: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    showProgressBar: function() {
      this.$progress.start();
    // setTimeout(() => {
    //     this.$progress.finish();
    // }, 2000);
    },
    goIndex: function() {
      this.$router.push('/');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/sass/base/mixins";
@import "~@/assets/sass/base/weui_button";

.container {
    display: flex;
    width: 100%;
    padding: 20px;
}

</style>
