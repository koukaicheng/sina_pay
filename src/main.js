import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import 'es6-promise/auto'
import { sync } from 'vuex-router-sync'
import store from './store'
import 'amfe-flexible'

//注册封装的http请求
import api from './utils/http/index'
//注册封装的UI组件和功能组件
import defaultUi from './components/index.js'

Vue.use(defaultUi)
sync(store, router)

//setData
Vue.prototype.setData = function (newObj) {
  Object.keys(newObj).map(key => {
    this.$set(this.$data, key, newObj[key])
  })
}

import './utils/api/filter'

Vue.use(api)

Vue.config.productionTip = false
// 区分开发环境
window.$prod = process.env.NODE_ENV === 'production'
if ($prod) {
  //  解决移动端浏览器 300 毫秒点击延迟问题
  window.document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
const vm = {
  el: '#app',
  router,
  store,
  render: h => h(App)
}
new Vue(vm)
