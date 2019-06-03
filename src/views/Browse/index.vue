<template>
  <div class="container">
    <div class="hero">
      <div class="hero-body">
        <p class="title">Browsing Movies..</p>
        <p class="sub-title">Displaying <span v-if=!selectedGenreNames.length>all</span>
          <span v-else>{{selectedGenreNames.length > 3 ? "multiple genre" : selectedGenreNames.join(", ")}}</span> movies 
          {{ (selectedYears.filter(Boolean).length === 0) ? null : 'for the years - ' }} <span>{{selectedYears.length > 3 ? `${selectedYears[0]}...` : selectedYears.join(", ")}}</span> 
          <!-- and rating of <span>{{minRating}} - {{maxRating}}</span> -->
        </p>
      </div>
    </div>
    <div class="body">
      <MovieFilter :show=true :genreList=genreList :count="movies.items.length" :total="movies.count"></MovieFilter>
      <div class="list">
        <List :title="null" :items="movies.items" :count="movies.count" @fetch="fetchData"></List>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
