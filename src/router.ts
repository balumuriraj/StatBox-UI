import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/';
import User from './views/User/';
import Movie from './views/Movie/';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: Movie
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User
  }
];

export default new Router({
  mode: 'history',
  routes
});
