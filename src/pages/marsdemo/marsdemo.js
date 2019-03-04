import Vue from 'vue'
import marsdemo from './marsdemo.vue'
import router from './router'
import 'lib-flexible/flexible'
import * as filters from "@/common/filters";
import plugins from '@/plugins/index';
import components from '@/components/index';
Vue.use(plugins);
Vue.use(components);

Vue.config.productionTip = false

// 注册全局 filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { marsdemo },
  template: '<marsdemo/>'
})
