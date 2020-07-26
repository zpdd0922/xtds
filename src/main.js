// es6 --> es5
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMeta from 'vue-meta'
import VueLazyLoad from 'vue-lazyload'

import FastClick from 'fastclick'

import './assets/js/rem'

// 公用组件注册
import './components/register'

// 引入路由控制
import './router/permission'

// 引入 Style 加载基础样式
import {
  // eslint-disable-next-line
  Style,
  Slide,
  Loading,
  Button,
  Dialog,
  Toast,
  DatePicker,
  IndexList
} from 'cube-ui'

// 样式配置
import './assets/stylus/index.styl'

Vue.use(Slide)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(DatePicker)
Vue.use(IndexList)

// 单独设置页面的title和meta信息
Vue.use(VueMeta)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/images/default.png')
})

// 避免浏览器兼容问题引起的点击问题
if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

// 非生产环境开启 vConsole
if (process.env.VUE_APP_CONSOLE === 'show') {
  const VConsole = require('vconsole')
  const vConsole = new VConsole()
  console.log(vConsole.version)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
