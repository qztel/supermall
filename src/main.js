import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast'

Vue.config.productionTip = false

//在这里添加自定义的$bus
//赋值为Vue实例，这样他就成为了事件总线，可以添加公用的方法
Vue.prototype.$bus = new Vue()

//安装toast插件，自键插件，用来弹出提示框
Vue.use(toast)

//解决移动端300MS延迟
FastClick.attach(document.body)

//使用图片懒加载
//1.
Vue.use(VueLazyload)
//2.传入其他参数
Vue.use(VueLazyload,{
  //加载时显示这个，里面可以使用
  // require('填入图片地址')
  loading: ''
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
