<template>
  <div class="columns is-multiline">
    <template v-if="movies.length">
      <template v-for="movie in movies">
        <div class="column is-narrow" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </div>
      </template>
    </template>

    <template v-else>
      <template v-for="movie in placeholders">
        <MovieCard :movie="movie" :key="movie.id"></MovieCard>
      </template>
    </template>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>