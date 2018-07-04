import Vue from 'vue'
import TDTN from './tdtn.vue'
import router from './router'
import request from '@/plugins/http'
import 'lib-flexible/flexible'

Vue.prototype.$request = request
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { TDTN },
  template: '<TDTN/>'
})
