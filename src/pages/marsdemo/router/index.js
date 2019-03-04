import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/marsdemo/views/index'
import Toast from '@/pages/marsdemo/views/toast'
import Loading from '@/pages/marsdemo/views/loading'
import ProgressBar from '@/pages/marsdemo/views/progressbar'
import Modal from '@/pages/marsdemo/views/modal'
import Tabs from '@/pages/marsdemo/views/tabs'
// import Header from '@/components/common/header'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/toast',
      name: 'Toast',
      component: Toast
    },
    {
      path: '/loading',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/progressbar',
      name: 'ProgressBar',
      component: ProgressBar
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/tabs',
      name: 'Tabs',
      component: Tabs
    }
  ]
})
