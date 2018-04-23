import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import auth from './auth';
import fontawesome from '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const currentUser = auth.user();
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  if (requireAuth && !currentUser) {
    next('login');
  } else if (guestOnly && currentUser) {
    next('dashboard');
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  beforeCreate() {
    auth.init(this);
  },
  render: (h) => h(App)
}).$mount('#app');
