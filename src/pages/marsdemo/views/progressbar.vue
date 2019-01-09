<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-primary" @click="showProgressBar">
        showProgressBar
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/sass/base/mixins";

.container {
    display: flex;
    width: 100%;
    padding: 20px;
    .btn-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        .btn {
            width: 80%;
            padding-left: 28px;
            padding-right: 28px;
            box-sizing: border-box;
            font-size: 36px;
            text-align: center;
            text-decoration: none;
            color: #FFFFFF;
            line-height: 2.33333333;
            border-radius: 10px;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            overflow: hidden;
            margin: 10px;
            &.btn-primary {
                background-color: #04BE02;
            }
        }
    }
}

</style>
