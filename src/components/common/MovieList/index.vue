<template>
  <div class="columns is-multiline is-centered">
    <template v-if="movies && movies.length">
      <template v-for="movie in movies">
        <div class="column is-narrow" :key="movie.id">
          <div class="movie-card-container">
            <div class="movie-card-wrapper">
              <MovieCard :movie="movie"></MovieCard>
            </div>
          </div>
        </div>
      </template>
    </template>

    <template v-else>
      <template v-for="i in 7">
        <div class="movie-card-container" :key="i">
          <div class="movie-card-wrapper">
            <MovieCard></MovieCard>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>