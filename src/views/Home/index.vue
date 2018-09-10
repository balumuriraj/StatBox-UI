<template>
  <div class="home">
    <section class="hero is-danger is-medium">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">StatBox</h1>
          <!-- <h2 class="subtitle">find movies you want to watch</h2> -->
          <input type="text" class="search" placeholder="find movies you want to watch...">
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
      <div class="container">
        <MovieList title="Latest" :movies="latestMovies"></MovieList>
        <br>
        <MovieList title="Coming Soon" :movies="upcomingMovies"></MovieList>
        <br>
        <MovieList title="Trending" :movies="upcomingMovies"></MovieList>
      </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
