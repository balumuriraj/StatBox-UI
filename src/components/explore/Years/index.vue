<template>
  <div>
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">{{id}} Movies</p>
      </div>
    </div>
    
    <div class="list" v-if="id === 'recent' && recent">
      <MovieList :title=null :movies=recent.items :count=recent.count @fetch=fetchMovies></MovieList>
    </div>

    <div class="list" v-if="id === '2010-2015' && from2010to2015">
      <MovieList :title=null :movies=from2010to2015.items :count=from2010to2015.count @fetch=fetchMovies></MovieList>
    </div>

    <div class="list" v-if="id === '2000-2010' && from2000to2010">
      <MovieList :title=null :movies=from2000to2010.items :count=from2000to2010.count @fetch=fetchMovies></MovieList>
    </div>

    <div class="list" v-if="id === '1990-2000' && from1990to2000">
      <MovieList :title=null :movies=from1990to2000.items :count=from1990to2000.count @fetch=fetchMovies></MovieList>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>