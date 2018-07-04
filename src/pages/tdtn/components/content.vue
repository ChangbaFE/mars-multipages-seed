<template>
    <section class="content">
        content + {{ this.$route.query.tabid }}
        <ul class="ranklist clearfix">
            <li v-for="(item, index) in ranklist" :key="item.userid">
                <v-item :key="item.userid" :item="item" :index="index"></v-item>
            </li>
        </ul>
    </section> 
</template>

<script>
import item from "./list-item"

export default {
  name: 'Content',
  components: {
      "v-item" : item
  },
  data () {
    return {
      msg: 'Content',
    //   curr_tabid: 0,
      ranklist: [],
    }
  },
  created() {
      let _this = this;
    //   _this.curr_tabid = _this.$route.query.tabid;
      _this.getList(_this.curr_tabid);
  },
  computed: {
      curr_tabid: function () {
          return this.$route.query.tabid
      }
  },
  methods: {
      getList(tabid) {
        let _this = this;
        let params = {
            'ac': 'flex_interface',
            'key': 'thebestvocalactivity',
            'param': tabid,
            'curuserid': '57'
        }
        _this.$request.get('/api/mars_test_api.php', params).then(function(response) {
            console.log(response.data.list[0].rank)
            _this.ranklist = response.data.list[0].rank;
        })
      }
  },
  watch: {
      curr_tabid: function () {
          this.getList(this.curr_tabid);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../common/sass/mixin";

</style>
