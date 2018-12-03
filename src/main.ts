import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import auth from '@/auth';
import VueLazyload from 'vue-lazyload';
import '@fortawesome/fontawesome-free-solid';
import 'firebaseui/dist/firebaseui.css';
import 'swiper/dist/css/swiper.css';

Vue.use(VueLazyload);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() { auth.init(this); },
  created() { auth.initObserver(this); },
  render: (h) => h(App)
}).$mount('#app');
