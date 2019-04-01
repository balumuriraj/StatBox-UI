<template>
  <div class="movie-card-container">
    <div class="movie-card">
      <div v-if=item class="data-container">
        <router-link :to="'/movie/'+item.id" v-if="isMovie">
          <img v-lazy="item.poster" :alt="item.title">
        </router-link>
        <router-link :to="'/celeb/'+item.id" v-else>
          <img v-if="item.photo" v-lazy="item.photo" :alt="item.name">
          <img v-else src="../../../assets/avatar.png" :alt="item.name">
        </router-link>
      </div>
      <div v-else class="placeholder-container"></div>
    </div>
    <div class="info-card">
      <div class="title">
        <p>{{item && (item.title || item.name)}}</p>
      </div>
      <div class="info">
        <div v-if=item>
          <span>{{year || "year N/A"}}</span>
        </div>
        <div v-if="item && isMovie" class="rating">
          <span v-show="item && (userRating || rating)" :class="{'user-rating': userRating}">
            <font-awesome-icon icon="star" class="icon"></font-awesome-icon>{{userRating || rating || "--"}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>