<!-- vConsole Demo -->
<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-primary" @click="goIndex">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import VConsole from "VConsole";
export default {
  name: 'VConsole',
  data() {
    return {
      value: '1'
    }
  },
  computed: {
  },
  mounted() {
    const vConsole = new VConsole();
  },
  created() {
  },
  methods: {
    goIndex: function() {
      this.$router.push('/');
    }
  }
}

</script>
<style lang='scss' scoped>
@import "~@/assets/sass/base/mixins";
@import "~@/assets/sass/base/weui_button";

.container {
  display: flex;
  width: 100%;
  padding: 20px;
}
</style>