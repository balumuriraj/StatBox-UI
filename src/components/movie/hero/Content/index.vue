<template>
  <div class="content-container">
    <div class="title-block">
      <p class="title">{{ movie.title }}</p>
    </div>

    <div class="ratings-block">
      <div class="rating-block">
        <div class="score">
          <font-awesome-icon :icon="['fas', 'star']" class="icon"></font-awesome-icon> 
          <span class="rating"> 3.5</span>
          <span class="divisor"> (2,144 Ratings)</span>
        </div>
      </div>
      <div class="rating-block">
        <div class="score">
          <span class="rating"> 84</span>
          <span class="divisor"> Critics Score </span>
        </div>
      </div>
    </div>

    <div class="buttons-block">
      <div class="favorite-button button" v-on:click="setSeen()">
        <font-awesome-icon icon="heart" class="icon" :class="{ 'active': isSeen }"></font-awesome-icon> 
        <span> Favorite</span>
      </div>
      <div class="bookmark-button button" v-on:click="setBookmark()">
        <font-awesome-icon icon="bookmark" class="icon" :class="{ 'active': isBookmarked }"></font-awesome-icon> 
        <span> WatchList</span>
      </div>
      <div class="review-button button" v-on:click="setReview()">
        <font-awesome-icon icon="edit" class="icon" :class="{ 'active': isReviewed }"></font-awesome-icon> 
        <span> Review</span>
      </div>
    </div>
  </div> 
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
