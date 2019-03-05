<template>
  <div class="container">
    <mars-tabs>
      <mars-tab-pane label="Tab1">
        <p>Content Tab1</p>
      </mars-tab-pane>
      <mars-tab-pane label="Tab2">
        <p>Content Tab2</p>
      </mars-tab-pane>
      <mars-tab-pane label="Tab3">
        <p>Content Tab3</p>
      </mars-tab-pane>
    </mars-tabs>
    <div class="btn-group">
      <button class="btn btn-primary" @click="goIndex">
        Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      value: '1'
    }
  },
  computed: {
  },
  mounted() {
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
<style lang="scss" scoped>
@import "~@/assets/sass/base/mixins";
@import "~@/assets/sass/base/weui_button";

.container {
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
}

</style>
