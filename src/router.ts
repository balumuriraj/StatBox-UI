import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/';
import User from './views/User/';
import Celeb from './views/Celeb/';
import Movie from './views/Movie/';
import Login from './views/Login/';
import Dashboard from './views/Dashboard/';
import Explore from '@/views/Explore';
import ExploreHome from '@/components/explore/ExploreHome';
import Movies from '@/components/explore/Movies';
import Genre from './components/explore/Genre';
import Years from './components/explore/Years';
import Rate from './views/Rate';
import Search from './views/Search';
import Settings from './views/Settings';
import Browse from './views/Browse';

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
    path: '/explore',
    component: Explore,
    children: [
      {
        path: '',
        name: 'explore',
        component: ExploreHome
      },
      {
        path: ':id',
        name: 'movies',
        component: Movies
      },
      {
        path: 'genre/:id',
        name: 'genre',
        component: Genre
      },
      {
        path: 'years/:id',
        name: 'years',
        component: Years
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guestOnly: true }
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
