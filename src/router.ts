import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/';
import User from './views/User/';
import Celeb from './views/Celeb/';
import Movie from './views/Movie/';
import Login from './views/Login/';
import Dashboard from './views/Dashboard/';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requireAuth: true }
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: Movie
  },
  {
    path: '/celeb/:id',
    name: 'celeb',
    component: Celeb
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User
  }
];

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
