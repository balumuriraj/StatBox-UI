<template>
  <div>
    <template v-if="movie.poster" class="movie-card">
      <router-link :to="'/movie/'+movie.id">
        <figure class="image">
          <img v-lazy="movie.poster" :alt="movie.title">
        </figure>
      </router-link>
      <div class="rating">
        <font-awesome-icon :icon="['fas', 'star']"></font-awesome-icon>
        <span> 3.5</span>
      </div>
    </template>
    <template v-else class="movie-card">
      <div class="placeholder-image"></div>
    </template>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>