<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-primary" @click="showModal">
        showModal
      </button>
      <button class="btn btn-primary" @click="goIndex">
        Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
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
    showModal: function() {
      this.$modal.show({
        title: '提示',
        content: '你好，这是一个模态框',
        confirmText: '确定'
      });
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
