<template>
  <div class="tabs">
    <ul class="tabs-bar">
      <li v-for="(item, index) in panes" v-bind:key="index" :class="{ active: currentTab == item.index }">
        <a href="" @click.prevent="handleClick(item.index)">{{ item.label }}</a>
      </li>
    </ul>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarsTabs',
  props: {
    value: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      currentTab: this.value,
      panes: []
    }
  },

  watch: {
    value(value) {
      this.currentTab = value;
    },
    currentTab(value) {
      this.$emit('change', value);
    }
  },

  updated() {
    this.getPanes();

    if (this.currentTab > this.panes.length - 1) {
      this.currentTab = 0;
    }
  },

  methods: {
    handleClick(index) {
      this.setCurrentTab(index);
    },

    setCurrentTab(index) {
      this.currentTab = index;
      this.$emit('input', index);
    },

    getPanes() {
      // console.log(this.$slots.default);
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
          vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'MarsTabPane');
        // update indeed
        const panes = paneSlots.map(({ componentInstance }, index) => {
          componentInstance.index = index;
          return componentInstance;
        });
        if (!(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]))) {
          this.panes = panes;
        }
      }
      else if (this.panes.length !== 0) {
        this.panes = [];
      }
    }
  },
  mounted() {
    this.getPanes();
    this.$emit('change', this.currentTab);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~@/assets/sass/base/mixins";
.tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  .tabs-bar {
    display: flex;
    flex-direction: row;
    width: 675px;
    height: 80px;
    margin: 0 auto;
    li {
      display: flex;
      width: 50%;
      border: 2px solid #ffa964;
      border-right: 0;
      color: #ffa964;
      justify-content: center;
      align-items: center;
      &:first-child {
        border-right: 0;
        @include radius(1.066667rem 0 0 1.066667rem);
        background-clip: padding-box;
      }
      &:last-child {
        border-right: 2px solid #ffa964;
        border-left: 2px solid #ffa964;
        @include radius(0 1.066667rem 1.066667rem 0);
        background-clip: padding-box;
      }
    }
    .active {
      background-color: #ffa964;
      color: #4b55b3;
    }
  }
  .tabs-content {

  }
}
</style>
