import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'assets/iconfont/iconfont.js'

Vue.use(toast)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('assets/img/pictures/loading.jpg'),
  loading: require('assets/img/pictures/l.gif'),
  attempt: 3,
  throttleWait: 300
})

FastClick.attach(document.body);
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
