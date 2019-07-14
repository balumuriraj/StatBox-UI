import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/';
import User from './views/User/';
import Celeb from './views/Celeb/';
import Movie from './views/Movie/';
import Dashboard from './views/Dashboard/';
import Rate from './views/Rate';
import Search from './views/Search';
import Settings from './views/Settings';
import Browse from './views/Browse';
import Polls from './views/Polls';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse
  },
  {
    path: '/polls',
    name: 'polls',
    component: Polls
  },
  {
    path: '/rate',
    name: 'rate',
    component: Rate,
    meta: { requireAuth: true }
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
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requireAuth: true }
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
