<template>
  <div class="content-container">
    <div class="title-block">
      <h1 class="title">{{ movie.title }}</h1>
    </div>
    
    <div class="info-block">
      <div class="cert">
        <span>{{ cert }}</span>
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'calendar-alt']" fixed-width></font-awesome-icon> {{ movie.date }}
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'clock']" fixed-width></font-awesome-icon> {{ movie.runtime }} mins
      </div>                
    </div>

    <div class="genre-block">
      <ul class="genre-list">
        <li v-for="(genre, index) in movie.genre" :key='index'>
          <router-link to="/">{{ genre }}</router-link>
        </li>
      </ul>
    </div>

    <div class="description-block">
      <p>{{ description }}</p>
    </div>

    <div class="columns ratings-block">
      <div class="column is-narrow">
        <div class="rating-block">
          <div class="score">
            <font-awesome-icon :icon="['fas', 'star']" fixed-width></font-awesome-icon> 
            <span class="rating">3.5</span>
            <!-- <span class="divisor">/5</span> -->
          </div>
          <p>Rating (2,144)</p>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="rating-block">
          <div class="score">
            <span>84</span>
            <!-- <span class="divisor">/100</span> -->
          </div>
          <p>Critics Score</p>
        </div>
      </div>
    </div>
  </div> 
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
