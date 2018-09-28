<template>
  <div class="columns is-multiline is-centered">
    <template v-for="genre in genreList.items">
      <div class="column is-narrow" :key="genre.id">
        <router-link class="genre-card-container" :to="'/movies/genre/' + genre.id">
          <div v-if="genre.image" class="image">
            <img src="https://i2.wp.com/www.microfinancemonitor.com/wp-content/uploads/2017/02/bahubali-2-bhalladeva.jpg?resize=620%2C330">
          </div>
          <p class="name">{{genre.name}}</p>
          <!-- <p class="count">{{genre.moviesCount}} movies</p> -->
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>