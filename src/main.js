import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const $ = require('jquery')
window.$ = $
require('jquery-confirm')

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// 封装基础输入框
import Validator from "@/common/js/validator";
import SCInput from '@/components/BaseComponents/SCInput/SCInput';
//校验规则
Vue.use(Validator)

Vue.use(ElementUI)
Vue.use(SCInput)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
