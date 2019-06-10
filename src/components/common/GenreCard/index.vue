<template>
  <div class="genre-card-container">
    <div class="genre-card">
      <router-link :to="item.url">
        <img v-lazy="item.poster1" :alt="item.title">
        <img v-lazy="item.poster2" :alt="item.title">
        <div class="title-contianer">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>