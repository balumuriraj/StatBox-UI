<template>
  <div class="movie-wrapper">
    <section class="hero is-danger">
      <!-- <div class="celeb-background">
        <img :src="photo" />
        <div class="overlay-gradient"></div>
      </div> -->

      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <template v-if="celeb.photo">
            <img :src="celeb.photo" width="150">
          </template>
          <template v-else>
            <img src="../../assets/avatar.png" width="150">
          </template>
          <p class="title">{{celeb.name}}</p>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
      <div class="container"> 
        <Carousel title="Movies" :movies=celeb.movies.all></Carousel>
      </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
