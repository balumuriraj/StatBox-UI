<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" :class="{ 'white-bg': whiteBg }">
    <div class="navbar-top">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">StatBox</router-link>
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
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
