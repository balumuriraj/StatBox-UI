<template>
  <div class="list-container" ref="listBox">
    <div class="level">
      <div class="level-item">
        <p class="title">{{ title }}</p>
      </div>
      <div class="level-item">
        <p class="count">{{ count }} movies</p>
      </div>
    </div>

    <div class="list-block">
      <div v-if="movies && movies.length" v-for="movie in movies" :key="movie.id" class="list-item">
        <MovieCard :movie="movie"></MovieCard>
      </div>

      <div v-else v-for="i in 10" :key="i" class="list-item">
        <MovieCard></MovieCard>
      </div>
    </div>

    <div class="loading">
      <font-awesome-icon v-show=loading icon="spinner" spin />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>