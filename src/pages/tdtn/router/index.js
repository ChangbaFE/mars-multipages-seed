import Vue from 'vue'
import Router from 'vue-router'
import content from '../components/content'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  routes: [{
      path: '/content',
      name: 'content',
      component: content
    }
  ]
})
