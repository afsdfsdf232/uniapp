import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import store from '@/store'
import regGlobalComponents from '@/components'
Vue.use(uView)
Vue.config.productionTip = false

regGlobalComponents(Vue)
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

app.$mount()
