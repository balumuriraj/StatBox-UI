<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="{ 'white-bg': whiteBg }"
  >
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <div class="logo"><img :src="require('@/assets/logo.svg')"></div>
          <div class="title">statbox</div>
        </router-link>
      </div>
      <div class="navbar-menu mobile">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div class="search-container">
            <input type="text" placeholder="search" v-model="searchTerm" >
            <div class="icon-block">
              <font-awesome-icon icon="search" class="icon" />
            </div>
          </div>
          <div class="navbar-item" @click="toggleSideMenu()">
            <div class="icon-container">
              <font-awesome-icon icon="bars" class="icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-menu desktop">
        <div class="navbar-start">
          <router-link class="navbar-bucket" to="/browse">
            <span class="navbar-item"><font-awesome-icon icon="film" class="icon" /> Browse</span>
          </router-link>
          <router-link class="navbar-bucket" to="/polls">
            <span class="navbar-item"><font-awesome-icon :icon="['far', 'chart-bar']" class="icon" /> Polls</span>
          </router-link>
          <router-link class="navbar-bucket" v-if="isUserLoggedIn" to="/rate">
            <span class="navbar-item"><font-awesome-icon :icon="['far', 'star']" class="icon" /> rate</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="search-container">
            <input type="text" placeholder="search movies or celebs" v-model="searchTerm" >
            <div class="icon-block">
              <font-awesome-icon icon="search" class="icon" />
            </div>
          </div>
          <a class="navbar-bucket" v-if="isUserLoggedIn">
            <div class="navbar-item">
              <div class="img-holder">
                <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" />
              </div>
              <font-awesome-icon icon="caret-down" class="icon" />
            </div>
            <div class="navbar-bucket-items">
              <router-link class="navbar-bucket-item" to="/dashboard">Dashboard</router-link>
              <router-link class="navbar-bucket-item" to="/settings">Settings</router-link>
              <a class="navbar-bucket-item" @click="logOut">Logout</a>
            </div>
          </a>
          <a v-if="!isUserLoggedIn" class="navbar-button" @click="logIn">Login</a>
          <!-- <router-link v-if="!isUserLoggedIn" class="navbar-button" to="/login">SignUp</router-link> -->
        </div>
      </div>
    </div>
    <div class="navbar-side-menu" :class="{ 'active': isSideMenuActive }" @click="toggleSideMenu()">
      <div class="navbar-item-container" @click.stop="toggleSideMenu()">
        <router-link class="navbar-item brand" to="/" v-if="!isUserLoggedIn">
          <div class="logo"><img :src="require('@/assets/logo.svg')"></div>
          <div class="title">statbox</div>
        </router-link>
        <router-link class="navbar-item title-container" to="/dashboard" v-if="isUserLoggedIn">
          <div class="img-holder">
            <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" />
          </div>
          <div class="info-block">
            <p>{{user.name}}</p>
            <div class="numbers-block">
              <div class="item">
                <font-awesome-icon :icon="['fas', 'heart']" class="icon favorites-icon" /> {{user.favorites.count || 0}}
              </div>
              <div class="item">
                <font-awesome-icon :icon="['fas', 'bookmark']" class="icon bookmark-icon" /> {{user.bookmarks.count || 0}}
              </div>
              <div class="item">
                <font-awesome-icon :icon="['fas', 'star']" class="icon rating-icon" /> {{user.reviewed.count || 0}}
              </div>
            </div>
          </div>
        </router-link>
        <router-link class="navbar-item" to="/" v-if="isUserLoggedIn">
          <font-awesome-icon icon="home" class="icon" /> Home
        </router-link>
        <router-link class="navbar-item" to="/browse">
          <font-awesome-icon icon="film" class="icon" /> Browse
        </router-link>
        <router-link class="navbar-item" to="/polls">
          <font-awesome-icon :icon="['far', 'chart-bar']" class="icon" /> Polls
        </router-link>
        <!-- <router-link class="navbar-item sub" to="/explore">
          <font-awesome-icon icon="caret-right" class="icon" /> Genres
        </router-link>
        <router-link class="navbar-item sub" to="/explore">
          <font-awesome-icon icon="caret-right" class="icon" /> By Years
        </router-link>
        <router-link class="navbar-item sub" to="/explore">
          <font-awesome-icon icon="caret-right" class="icon" /> More...
        </router-link> -->
        <router-link v-if="isUserLoggedIn" class="navbar-item" to="/rate">
          <font-awesome-icon :icon="['far', 'star']" class="icon" /> rate
        </router-link>
        <!-- <router-link class="navbar-item" to="/search">
          <font-awesome-icon icon="search" class="icon" /> search
        </router-link> -->
        <router-link class="navbar-item log" to="/dashboard" v-if="isUserLoggedIn">
          <font-awesome-icon icon="chalkboard" class="icon" /> Dashboard
        </router-link>
        <router-link class="navbar-item" to="/settings" v-if="isUserLoggedIn">
          <font-awesome-icon icon="sliders-h" class="icon" /> settings
        </router-link>
        <a v-if="isUserLoggedIn" class="navbar-item log" @click="logOut">
          <font-awesome-icon icon="sign-out-alt" class="icon" /> Logout
        </a>
        <a v-if="!isUserLoggedIn" class="navbar-item log" @click="logIn">
          <font-awesome-icon icon="sign-in-alt" class="icon" /> Login
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
