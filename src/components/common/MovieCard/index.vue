<template>
  <div class="movie-card column is-narrow">
    <router-link :to="'/movie/'+movie.id" class="movie-link">
      <figure class="image">
        <img :src="movie.poster" :alt="movie.title">
      </figure>
    </router-link>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>