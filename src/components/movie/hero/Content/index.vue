<template>
  <div class="content-container">
    <div class="title-block">
      <p class="title">{{ movie.title }}</p>
    </div>

    <div class="ratings-block">
      <div class="rating-block">
        <div class="score">
          <font-awesome-icon :icon="['fas', 'star']" class="icon"></font-awesome-icon> 
          <span class="rating"> {{movie.rating && Math.round(movie.rating * 100) / 100 || '-'}}</span>
          <span class="divisor"> [ {{ movie.ratingsCount }} Ratings ]</span>
        </div>
      </div>
      <div class="rating-block">
        <div class="score">
          <span class="rating"> {{ movie.userReview && movie.userReview.rating || '-' }}</span>
          <span class="divisor"> Your Rating </span>
        </div>
      </div>
    </div>

    <div class="buttons-block">
      <div class="favorites-button button" v-on:click="movie.setFavorite(!movie.isFavorite)">
        <font-awesome-icon icon="heart" class="icon" :class="{ 'active': movie.isFavorite }"></font-awesome-icon> 
        <span> Favorite</span>
      </div>
      <div class="bookmark-button button" v-on:click="movie.setBookmark(!movie.isBookmarked)">
        <font-awesome-icon icon="bookmark" class="icon" :class="{ 'active': movie.isBookmarked }"></font-awesome-icon> 
        <span> WatchList</span>
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
