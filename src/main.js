// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/store'
//import {addCookie, getCookie, delCookie} from './util/util.js';

Vue.use(MintUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
/*Vue.prototype.$cookieStore = {
  addCookie,
  getCookie,
  delCookie
}*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
