<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item logo active" to="/">StatBox</router-link>
        <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">RECOMMENDATIONS</router-link>
          <router-link class="navbar-item" to="/">WATCHLIST</router-link>
          <router-link class="navbar-item" to="/">EXPLORE</router-link>
          <router-link class="navbar-item" to="/">SEARCH</router-link>
        </div>
        <div v-if="user" class="navbar-end">
          <router-link class="navbar-item" to="/dashboard">{{user.displayName}}</router-link>
          <a class="navbar-item" @click="logOut">LOGOUT</a>
        </div>
        <div v-else class="navbar-end">
          <router-link class="navbar-item" to="/login">LOGIN</router-link>         
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
