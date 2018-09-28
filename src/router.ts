import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/';
import User from './views/User/';
import Celeb from './views/Celeb/';
import Movie from './views/Movie/';
import Login from './views/Login/';
import Dashboard from './views/Dashboard/';
import ViewAll from '@/views/ViewAll';
import Movies from '@/views/Movies';
import GenreList from '@/components/movies/GenreList';
import Genre from '@/components/movies/Genre';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movies,
    children: [
      {
        path: '',
        name: 'genrelist',
        component: GenreList
      },
      {
        path: 'genre/:id',
        name: 'genre',
        component: Genre
      }
    ]
  },
  {
    path: '/viewall',
    name: 'viewall',
    component: ViewAll,
    props: true
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

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
