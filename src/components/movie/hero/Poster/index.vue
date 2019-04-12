<template>
  <div class="poster-container">
    <img v-if=movie.poster :src="movie.poster" />
    <div v-else class="img-holder"></div>
    <div class="stars-container">
      <Rating :movie=movie></Rating>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
