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
          <!-- Add Pagination -->
          <div class="swiper-custom-pagination"></div>
          <a class="link" href="#">VIEW ALL</a>
        </div>
      </div>
    </div>
    <swiper :options="swiperOptions">
      <!-- slides -->
      <template v-if="movies.length">
        <template v-for="movie in movies">
          <swiper-slide :key="movie.id">
            <div class="movie-card-container">
              <MovieCard :movie="movie"></MovieCard>
            </div>
          </swiper-slide>
        </template>
      </template>

      <template v-else>
        <template v-for="movie in placeholders">
          <swiper-slide :key="movie.id">
            <div class="movie-card-container">
              <MovieCard :movie="movie"></MovieCard>
            </div>
          </swiper-slide>
        </template>
      </template>

      <!-- Optional controls -->
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