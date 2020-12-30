import Vue from 'vue'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal';

import App from './App.vue'

Vue.use(Notifications)
Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
