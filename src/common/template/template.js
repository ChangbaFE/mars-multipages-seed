import Vue from 'vue';
import router from './router';
import 'lib-flexible/flexible';
import template from './template.vue';
import * as filters from "@/common/filters";
// Plugins
import plugins from '@/plugins/index';

Vue.config.productionTip = false;
Vue.use(plugins);

// 注册全局 filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(template)
})
