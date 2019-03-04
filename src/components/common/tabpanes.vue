<template>
  <div class="tab-pane" :class="{ active: active }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MarsTabPane',

  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      index: 0,
      active: false
    }
  },
  created() {
    this.$parent.$on('change', (index) => {
      this.active = (this.index === index);
    })
  }
}
</script>

<style lang="scss" scoped>
.tab-pane {
  padding: 20px;
  display: none;
  &.active {
    display: block;
  }
}
</style>
