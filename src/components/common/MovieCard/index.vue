<template>
  <div class="movie-card-container">
    <div class="movie-card">
      <div v-if=movie class="data-container">
        <router-link :to="'/movie/'+movie.id">
          <img v-lazy="movie.poster" :alt="movie.title">
        </router-link>
      </div>
      <div v-else class="placeholder-container"></div>
    </div>
    <div class="info-card">
      <div class="title">
        <p>{{movie && movie.title}}</p>
      </div>
      <div class="rating">
        <div v-if=movie>
          <span>{{year}}</span>
        </div>
        <div v-if=movie>
          <span v-show="movie && (userRating || rating)" :class="{'user-rating': userRating}">
            <font-awesome-icon icon="star" class="icon"></font-awesome-icon>{{userRating || rating || "--"}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>