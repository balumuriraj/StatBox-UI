<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title">{{ title }}</p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p>{{ count }} movies</p>
        </div>
      </div>
    </div>

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
        <template v-for="i in 10">
          <div class="column is-narrow" :key="i">
            <div class="movie-card-container">
              <div class="movie-card-wrapper">
                <MovieCard></MovieCard>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>

    <div class="loading">
      <font-awesome-icon v-show=loading icon="spinner" spin />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>