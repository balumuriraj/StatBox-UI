<template>
  <section class="rate-container">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">Rate Movies</p>
      </div>
    </div>

    <div class="sub-menu">
      <div class="items-container top">
        <p :class="{ 'active': selected === 'popular' }" v-on:click="selected = 'popular'">Popular</p>
        <p :class="{ 'active': selected === 'years' }" v-on:click="selected = 'years'">Years</p>
        <p :class="{ 'active': selected === 'genre' }" v-on:click="selected = 'genre'">Genre</p>
      </div>
    </div>
    <div class="sub-menu" v-if="selected === 'years'">
      <div class="items-container">
        <p :class="{ 'active': selectedYears === 'recent' }" v-on:click="selectedYears = 'recent'">Recent</p>
        <p :class="{ 'active': selectedYears === '2011-15' }" v-on:click="selectedYears = '2011-15'">2011-15</p>
        <p :class="{ 'active': selectedYears === '2006-10' }" v-on:click="selectedYears = '2006-10'">2006-10</p>
        <p :class="{ 'active': selectedYears === '2000-05' }" v-on:click="selectedYears = '2000-05'">2000-05</p>
      </div>
    </div>
    <div class="sub-menu" v-if="selected === 'genre'">
      <div class="items-container">
        <p :class="{ 'active': selectedGenre === 'action' }" v-on:click="selectedGenre = 'action'">Action</p>
        <p :class="{ 'active': selectedGenre === 'comedy' }" v-on:click="selectedGenre = 'comedy'">Comedy</p>
        <p :class="{ 'active': selectedGenre === 'romance' }" v-on:click="selectedGenre = 'romance'">Romance</p>
        <p :class="{ 'active': selectedGenre === 'thriller' }" v-on:click="selectedGenre = 'thriller'">Thriller</p>
        <p :class="{ 'active': selectedGenre === 'drama' }" v-on:click="selectedGenre = 'drama'">Drama</p>
        <p :class="{ 'active': selectedGenre === 'horror' }" v-on:click="selectedGenre = 'horror'">Horror</p>
        <p :class="{ 'active': selectedGenre === 'crime' }" v-on:click="selectedGenre = 'crime'">Crime</p>
        <p :class="{ 'active': selectedGenre === 'family' }" v-on:click="selectedGenre = 'family'">Family</p>
        <p :class="{ 'active': selectedGenre === 'fantasy' }" v-on:click="selectedGenre = 'fantasy'">Fantasy</p>
        <p :class="{ 'active': selectedGenre === 'sci-fi' }" v-on:click="selectedGenre = 'sci-fi'">Sci-fi</p>
      </div>
    </div>
    
    <div class="list">
      <RateList :title=null :movies=movies.items :ratedMovies=movies.ratedItems :count=movies.count @fetch=fetchMovies></RateList>
    </div>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
