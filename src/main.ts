import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import auth from '@/auth';
import fontawesome from '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import 'firebaseui/dist/firebaseui.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() { auth.init(); },
  created() { auth.initObserver(this); },
  render: (h) => h(App)
}).$mount('#app');
