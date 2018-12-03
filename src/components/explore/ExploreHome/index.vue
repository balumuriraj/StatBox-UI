<template>
  <div class="home-container">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">Explore Movies</p>
      </div>
    </div>
    <!-- Content -->
    <section class="home-section">
      <div class="top-block block">
        <div class="title">Movies to Explore</div>
        <div class="box-container">
          <router-link class="box" v-for="(item, i) in exploreList" :key="i" :to="item.url">
            <div class="image-container">
              <div class="image-wrapper">
                <img :src="require(`@/assets/${item.image}`)">
              </div>
            </div>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
      </div>

      <div class="years-block block">
        <div class="title">Movies by years</div>
        <div class="box-container">
          <router-link class="box" v-for="(item, i) in yearsList" :key="i" :to="item.url">
            <div class="image-container">
              <div class="image-wrapper">
                <img :src="require(`@/assets/${item.image}`)">
              </div>
            </div>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
      </div>

      <div class="genre-block block">
        <div class="title">Movies by Genre</div>
        <div class="box-container">
          <router-link class="box" v-for="(item, i) in topGenreList" :key="i" :to="item.url">
            <div class="image-container">
              <div class="image-wrapper">
                <img :src="require(`@/assets/${item.image}`)">
              </div>
            </div>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
        <div class="genre-list-container">
          <div v-for="genre in restGenreList" :key="genre.id" class="genre-card-container" v-if="genre.moviesCount > 2">
            <router-link class="genre-card" :to="'/explore/genre/' + genre.id">
              <p class="name"><font-awesome-icon icon="film" class="icon"></font-awesome-icon> {{genre.name}}</p>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>