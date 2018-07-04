import Vue from 'vue'
import Router from 'vue-router'
// import Cell from '@/pages/cell/cell'
// import Header from '@/components/common/header'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Header',
      component: Header
    },
  ]
})
