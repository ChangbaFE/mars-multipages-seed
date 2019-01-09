<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-primary" @click="triggerToast">
        Toast
      </button>
      <button class="btn btn-primary" @click="triggerToastSuccess">
        Toast Success
      </button>
      <button class="btn btn-primary" @click="triggerToastError">
        Toast Error
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
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
    triggerToast: function() {
      this.$toast.notify('加载成功');
      // this.$toast.notify('获取数据成功');
    },
    triggerToastSuccess: function() {
      this.$toast.success('加载成功');
    },
    triggerToastError: function() {
      this.$toast.error('加载失败');
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
