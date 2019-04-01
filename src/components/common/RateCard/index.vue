<template>
  <div class="movie-card-container">
    <div class="main-section">
      <div class="movie-card">
        <div v-if=movie class="data-container">
          <router-link :to="'/movie/'+movie.id">
            <img v-lazy="movie.poster" :alt="movie.title">
          </router-link>
        </div>
        <div v-else class="placeholder-container"></div>
      </div>
      <div class="info-card">
        <div class="title-container">
          <p class="title">{{movie && movie.title}}</p>
          <p class="sub-title">{{year}}</p>
        </div>
        <div class="rating-container">
          <Rating :movie=movie></Rating>
        </div>
      </div>
    </div>
    <div class="buttons-section">
      <div class="favorite-button button" v-on:click="movie.setFavorite(!movie.isFavorite)">
        <font-awesome-icon icon="heart" class="icon" :class="{ 'active': movie.isFavorite }"></font-awesome-icon>
        <span> Favorite</span>
      </div>
      <div class="bookmark-button button" v-on:click="movie.setBookmark(!movie.isBookmarked)">
        <font-awesome-icon icon="bookmark" class="icon" :class="{ 'active': movie.isBookmarked }"></font-awesome-icon>
        <span> Watchlist</span>
      </div>
      <div class="review-button button" v-on:click="setReview()">
        <font-awesome-icon icon="edit" class="icon" :class="{ 'active': movie.isReviewed }"></font-awesome-icon>
        <span> Review</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>