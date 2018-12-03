<template>
  <div>
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">{{item.name}} Movies</p>
      </div>
    </div>
    
    <div class="list">
      <MovieList :title=null :movies=movies.items :count=movies.count @fetch=fetchMovies></MovieList>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>