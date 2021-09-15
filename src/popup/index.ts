import Vue from 'vue'
import App from '@/popup/App.vue'

import * as ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default new Vue({
  el: '#app',
  render: (h: Function) => h(App),
})
