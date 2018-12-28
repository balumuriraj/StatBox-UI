<template>
  <div class="poster-container">
    <img :src="movie && movie.poster" />
    <div class="stars-container">
      <Rating :movie=movie></Rating>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
