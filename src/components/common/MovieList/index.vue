<template>
  <div class="">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title">{{ title }}</p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control"><font-awesome-icon :icon="['fas', 'caret-left']"></font-awesome-icon></div>
          <a class="link" href="#">VIEW ALL</a>
          <div class="control"><font-awesome-icon :icon="['fas', 'caret-right']"></font-awesome-icon></div>
        </div>
      </div>
    </div>
    <div class="columns movie-list" id="content">
      <template v-for="movie in movies">
        <MovieCard :movie="movie" :key="movie.id"></MovieCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>