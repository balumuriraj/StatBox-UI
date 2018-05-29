<template>
  <div class="movie-wrapper">
    <section class="hero is-dark">
      <div class="celeb-background">
        <img :src="celeb.photo" />
        <div class="overlay-gradient"></div>
      </div>

      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <img :src=celeb.photo width="100">
          <p class="title">{{celeb.name}}</p>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
      <div class="container"> 
        <p class="title">Upcoming</p>
        <MovieList></MovieList> 
        <p class="title">Latest</p>
        <MovieList></MovieList> 
        <p class="title">Movies</p>
        <MovieList></MovieList> 
      </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
