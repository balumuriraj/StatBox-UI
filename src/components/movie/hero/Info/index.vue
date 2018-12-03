<template>
  <div class="info-content">
    <!-- <p class="title">Overview</p> -->
    
    <div class="info-block">
      <div class="cert" v-if=movie.cert>
        <span>{{ movie.cert }}</span>
      </div>
      <div v-if=movie.releaseDate>
        <font-awesome-icon :icon="['fas', 'calendar-alt']" fixed-width></font-awesome-icon> {{ movie.releaseDate }}
      </div>
      <div v-if=movie.runtime>
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
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
