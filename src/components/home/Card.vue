<template>
  <div class="movie-card column is-narrow">
    <router-link :to="'/movie/'+movie.id" class="movie-link">
      <figure class="image">
        <img :src="movie.poster" :alt="movie.title">
      </figure>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() public movie: any;
}
</script>

<style scoped lang="scss">
  .movie-card {
    width: 220px;
    
    img {
      border-radius: 5px;
    }
  }
</style>
