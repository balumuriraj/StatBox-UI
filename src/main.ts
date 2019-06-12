import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import auth from '@/auth';
import VueAnalytics from 'vue-analytics';
import VueLazyload from 'vue-lazyload';
import VueMeta from 'vue-meta';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'firebaseui/dist/firebaseui.css';
import 'swiper/dist/css/swiper.css';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueLazyload, { observer: true });
Vue.config.productionTip = false;
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
Vue.use(VueAnalytics, {
  id: 'UA-141694963-1',
  router
});

new Vue({
  router,
  store,
  beforeCreate() { auth.init(this); },
  created() { auth.initObserver(this); },
  render: (h) => h(App)
}).$mount('#app');
