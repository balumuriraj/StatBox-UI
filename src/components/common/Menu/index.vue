<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="{ 'white-bg': whiteBg }"
  >
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">StatBox</router-link>
      </div>
      <div class="navbar-menu mobile">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div class="navbar-item" @click="toggleSideMenu()">
            <div class="icon-container">
              <font-awesome-icon icon="bars" class="icon"></font-awesome-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-menu desktop">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/explore">explore</router-link>
          <router-link v-if="isUserLoggedIn" class="navbar-item" to="/">rate</router-link>
          <router-link class="navbar-item" to="/">search</router-link>
        </div>
        <div class="navbar-end">
          <router-link v-if="isUserLoggedIn" class="navbar-item" to="/dashboard">{{user.name}}</router-link>
          <a v-if="isUserLoggedIn" class="navbar-item" @click="logOut">Logout</a>
          <router-link v-if="!isUserLoggedIn" class="navbar-item" to="/login">Login</router-link>
        </div>
      </div>
    </div>
    <div class="navbar-side-menu" :class="{ 'active': isSideMenuActive }" @click="toggleSideMenu()">
      <div class="navbar-item-container" @click.stop="toggleSideMenu()">
        <router-link class="navbar-item" to="/">
          <font-awesome-icon icon="home" class="icon"></font-awesome-icon> Home
        </router-link>
        <router-link class="navbar-item" to="/explore">
          <font-awesome-icon icon="film" class="icon"></font-awesome-icon> explore
        </router-link>
        <router-link v-if="isUserLoggedIn" class="navbar-item" to="/">
          <font-awesome-icon icon="star" class="icon"></font-awesome-icon> rate
        </router-link>
        <router-link class="navbar-item" to="/">
          <font-awesome-icon icon="search" class="icon"></font-awesome-icon> search
        </router-link>
        <router-link v-if="isUserLoggedIn" class="navbar-item" to="/dashboard">
          <font-awesome-icon icon="user" class="icon"></font-awesome-icon> 
          {{user.name}}
        </router-link>
        <a v-if="isUserLoggedIn" class="navbar-item" @click="logOut">
          <font-awesome-icon icon="sign-out-alt" class="icon"></font-awesome-icon> Logout
        </a>
        <router-link v-if="!isUserLoggedIn" class="navbar-item" to="/login">
          <font-awesome-icon icon="sign-in-alt" class="icon"></font-awesome-icon> Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
