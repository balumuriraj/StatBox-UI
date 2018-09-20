<template>
  <div class="">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title">{{ title }}</p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p v-show=loading>loading...</p>
          <router-link class="link" :to="{ name: 'viewall', params: { movies, count } }">VIEW ALL</router-link>  
        </div>
      </div>
    </div>
    <swiper :options=options ref="carousel">
      <!-- slides -->
      <template v-if="movies.length">
        <template v-for="movie in movies">
          <swiper-slide :key="movie.id">
            <div class="movie-card-container">
              <div class="movie-card-wrapper">
                <MovieCard :movie="movie"></MovieCard>
              </div>
            </div>
          </swiper-slide>
        </template>
        <swiper-slide>
          <div class="movie-card-container">
            <div class="movie-card-wrapper">
              <MovieCard></MovieCard>
            </div>
          </div>
        </swiper-slide>
      </template>

      <template v-else>
        <template v-for="i in 6">
          <swiper-slide :key="i">
            <div class="movie-card-container">
              <div class="movie-card-wrapper"></div>
            </div>
          </swiper-slide>
        </template>
      </template>

      <!-- arrows -->
      <div class="swiper-custom-prev swiper-custom-button" slot="button-prev">
        <div class="icon-holder">
          <font-awesome-icon :icon="['fas', 'caret-left']"></font-awesome-icon>
        </div>
      </div>
      <div class="swiper-custom-next swiper-custom-button" slot="button-next">
        <div class="icon-holder">
          <font-awesome-icon :icon="['fas', 'caret-right']"></font-awesome-icon>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>