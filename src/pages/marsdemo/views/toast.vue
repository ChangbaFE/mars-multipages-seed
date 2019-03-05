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
      <button class="btn btn-primary" @click="goIndex">
        Back
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
