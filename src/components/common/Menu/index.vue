<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" :class="{ 'white-bg': whiteBg }">
    <div class="navbar-top">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">TMDb</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/explore">explore</router-link>
          <router-link v-if="isUserLoggedIn" class="navbar-item" to="/">rate</router-link>
          <router-link class="navbar-item" to="/">search</router-link>
        </div>
        <div class="navbar-end">
          <router-link v-if="isUserLoggedIn" class="navbar-item" to="/dashboard">{{user.name}}</router-link>
          <a v-if="isUserLoggedIn" class="navbar-item" @click="logOut">logout</a>
          <router-link v-if="!isUserLoggedIn" class="navbar-item" to="/login">LOGIN</router-link>         
        </div>
      </div>
    </div>
    <div class="navbar-bottom">
      <router-link class="navbar-item" to="/">
        <div class="icon">
          <font-awesome-icon icon="home" />
        </div>
        <span>home</span>
      </router-link>
      <router-link class="navbar-item" to="/explore">
        <div class="icon">
          <font-awesome-icon icon="film" />
        </div>
        <span>explore</span>
      </router-link>
      <router-link v-if="isUserLoggedIn" class="navbar-item" to="/">
        <div class="icon">
          <font-awesome-icon icon="star" />
        </div>
        <span>rate</span>
      </router-link>
      <router-link class="navbar-item" to="/">
        <div class="icon">
          <font-awesome-icon icon="search" />
        </div>
        <span>search</span>
      </router-link>
      <router-link class="navbar-item" to="/dashboard">
        <div class="icon">
          <font-awesome-icon icon="user" />
        </div>
        <span>profile</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
