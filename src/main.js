import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import FlashMessage from '@smartweb/vue-flash-message';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(FlashMessage);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
