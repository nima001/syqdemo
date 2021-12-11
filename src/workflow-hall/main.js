import Vue from 'vue'
import App from '@/framework/App.vue'
import '@/framework/plugins/message'
import accessFilter from '@/framework/permission'
import permit from '@/framework/plugins/permit'
import store from '@workflow/store'
import router from '@workflow/router'

Vue.config.productionTip = false
Vue.use(permit)

accessFilter(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
