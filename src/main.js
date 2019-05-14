import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// 封装基础输入框
import SCInput from '@/components/BaseComponents/SCInput/SCInput';

Vue.use(ElementUI)
Vue.use(SCInput)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
