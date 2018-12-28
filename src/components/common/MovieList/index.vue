<template>
  <div class="list-container" ref="listBox">
    <div class="title-container">
      <p class="title" v-if=title>{{ title }}</p>
      <p class="count" v-if=count>displaying {{movies && movies.length || 0}} of {{ count }} movies</p>
    </div>

    <div class="list-block" v-if="movies && movies.length">
      <div v-for="movie in movies" :key="movie.id" class="list-item">
        <MovieCard :movie="movie"></MovieCard>
      </div>
    </div>

    <div v-else>
      <EmptyBox></EmptyBox>
    </div>

    <div class="loading">
      <font-awesome-icon v-show=loading icon="spinner" spin />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>