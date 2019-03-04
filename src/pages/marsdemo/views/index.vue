<template>
  <div class="container">
    <ul class="table">
      <li @click="goToast">
        <i class="icon icon_nav_toast"></i>
        <p>Toast</p>
      </li>
      <li @click="goLoading">
        <i class="icon icon_nav_loading"></i>
        <p>Loading</p>
      </li>
      <li @click="goProgressBar">
        <i class="icon icon_nav_progress"></i>
        <p>Progress</p>
      </li>
      <li @click="goModal">
        <i class="icon icon_nav_modal"></i>
        <p>Modal</p>
      </li>
      <li @click="goTabs">
        <i class="icon icon_nav_tabs"></i>
        <p>Tabs</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'MarsDemo',
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
    goToast: function() {
      this.$router.push('/toast');
    },
    goLoading: function() {
      this.$router.push('/loading')
    },
    goProgressBar: function() {
      this.$router.push('/progressbar')
    },
    goModal: function() {
      this.$router.push('/modal')
    },
    goTabs: function() {
      this.$router.push('/tabs')
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
    .table {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
        li {
            display: flex;
            flex: 1;
            width: 25%;
            min-width: 25%;
            max-width: 25%;
            height: 200px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 2px solid #eee;
            margin: 10px 0;
            p {
                font-size: 32px;
            }
        }
    }
}

.icon {
    display: flex;
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    &.icon_nav_toast {
        background: url("~@/assets/images/icons/icon_nav_toast.png") no-repeat;
        background-size: 100% 100%;
    }
    &.icon_nav_loading {
        background: url("~@/assets/images/icons/icon_nav_loading.png") no-repeat;
        background-size: 100% 100%;
    }
    &.icon_nav_progress {
        background: url("~@/assets/images/icons/icon_nav_progress.png") no-repeat;
        background-size: 100% 100%;
    }
    &.icon_nav_modal {
        background: url("~@/assets/images/icons/icon_nav_modal.png") no-repeat;
        background-size: 100% 100%;
    }
    &.icon_nav_tabs {
        background: url("~@/assets/images/icons/icon_nav_tab.png") no-repeat;
        background-size: 100% 100%;
    }
}

</style>
