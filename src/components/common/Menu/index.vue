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
              <font-awesome-icon icon="search" class="icon"></font-awesome-icon>
            </div>
          </div>
          <div class="navbar-item" @click="toggleSideMenu()">
            <div class="icon-container">
              <font-awesome-icon icon="bars" class="icon"></font-awesome-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-menu desktop">
        <div class="navbar-start">
          <router-link class="navbar-bucket" to="/browse">
            <span class="navbar-item">Browse</span>
            <!-- <div class="navbar-bucket-items">
              <router-link class="navbar-bucket-item" to="/explore/latest">Genres</router-link>
              <router-link class="navbar-bucket-item" to="/explore/popular">Years</router-link>
              <router-link class="navbar-bucket-item" to="/browse">More...</router-link>
            </div> -->
          </router-link>
          <router-link class="navbar-bucket" v-if="isUserLoggedIn" to="/rate">
            <span class="navbar-item">rate</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="search-container">
            <input type="text" placeholder="search movies or celebs" v-model="searchTerm" >
            <div class="icon-block">
              <font-awesome-icon icon="search" class="icon"></font-awesome-icon>
            </div>
          </div>
          <router-link class="navbar-bucket" to="/dashboard" v-if="isUserLoggedIn">
            <div class="navbar-item">
              <div class="img-holder">
                <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" />
              </div>
              <font-awesome-icon icon="caret-down" class="icon"></font-awesome-icon>
            </div>
            <div class="navbar-bucket-items">
              <router-link class="navbar-bucket-item" to="/dashboard">Dashboard</router-link>
              <router-link class="navbar-bucket-item" to="/settings">Settings</router-link>
              <a v-if="isUserLoggedIn" class="navbar-bucket-item" @click="logOut">Logout</a>
            </div>
          </router-link>
          <router-link v-if="!isUserLoggedIn" class="navbar-button" to="/login">Login</router-link>
        </div>
      </div>
    </div>
    <div class="navbar-side-menu" :class="{ 'active': isSideMenuActive }" @click="toggleSideMenu()">
      <div class="navbar-item-container" @click.stop="toggleSideMenu()">
        <router-link class="navbar-item brand" to="/" v-if="!isUserLoggedIn">StatBox</router-link>
        <router-link class="navbar-item title-container" to="/dashboard" v-if="isUserLoggedIn">
          <div class="img-holder">
            <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" />
          </div>
          <div class="info-block">
            <p>{{user.name}}</p>
            <div class="numbers-block">
              <div class="item">
                <font-awesome-icon icon="heart" class="icon favorites-icon"></font-awesome-icon> {{user.favorites.count || 0}}
              </div>
              <div class="item">
                <font-awesome-icon icon="bookmark" class="icon bookmark-icon"></font-awesome-icon> {{user.bookmarks.count || 0}}
              </div>
              <div class="item">
                <font-awesome-icon icon="star" class="icon rating-icon"></font-awesome-icon> {{user.reviewed.count || 0}}
              </div>
            </div>
          </div>
        </router-link>
        <router-link class="navbar-item" to="/" v-if="isUserLoggedIn">
          <font-awesome-icon icon="home" class="icon"></font-awesome-icon> Home
        </router-link>
        <router-link class="navbar-item" to="/browse">
          <font-awesome-icon icon="film" class="icon"></font-awesome-icon> Browse
        </router-link>
        <!-- <router-link class="navbar-item sub" to="/explore">
          <font-awesome-icon icon="caret-right" class="icon"></font-awesome-icon> Genres
        </router-link>
        <router-link class="navbar-item sub" to="/explore">
          <font-awesome-icon icon="caret-right" class="icon"></font-awesome-icon> By Years
        </router-link>
        <router-link class="navbar-item sub" to="/explore">
          <font-awesome-icon icon="caret-right" class="icon"></font-awesome-icon> More...
        </router-link> -->
        <router-link v-if="isUserLoggedIn" class="navbar-item" to="/rate">
          <font-awesome-icon icon="star" class="icon"></font-awesome-icon> rate
        </router-link>
        <!-- <router-link class="navbar-item" to="/search">
          <font-awesome-icon icon="search" class="icon"></font-awesome-icon> search
        </router-link> -->
        <router-link class="navbar-item log" to="/dashboard" v-if="isUserLoggedIn">
          <font-awesome-icon icon="tachometer-alt" class="icon"></font-awesome-icon> Dashboard
        </router-link>
        <router-link class="navbar-item" to="/settings" v-if="isUserLoggedIn">
          <font-awesome-icon icon="cog" class="icon"></font-awesome-icon> settings
        </router-link>
        <a v-if="isUserLoggedIn" class="navbar-item log" @click="logOut">
          <font-awesome-icon icon="sign-out-alt" class="icon"></font-awesome-icon> Logout
        </a>
        <router-link v-if="!isUserLoggedIn" class="navbar-item log" to="/login">
          <font-awesome-icon icon="sign-in-alt" class="icon"></font-awesome-icon> Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
