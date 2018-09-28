<template>
  <MovieList :title=genre.name :movies=movies.items :count=movies.count @fetch=fetchMovies></MovieList>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>