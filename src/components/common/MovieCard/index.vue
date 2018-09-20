<template>
  <div v-if=movie class="movie-card">
    <router-link :to="'/movie/'+movie.id">
      <figure class="image-wrapper">
        <img v-lazy="movie.poster" :alt="movie.title">
      </figure>
    </router-link>
    <div class="rating">
      <font-awesome-icon :icon="['fas', 'star']"></font-awesome-icon>
      <span> 3.5</span>
    </div>    
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>