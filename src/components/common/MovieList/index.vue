<template>
  <div class="columns horizontal-list">
    <template v-for="movie in movies">
      <MovieCard :movie="movie" :key="movie.id"></MovieCard>
    </template>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>