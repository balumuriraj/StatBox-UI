<template>
  <div class="celeb-wrapper">
    <section class="hero">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <template v-if="celeb.photo">
          <img :src="celeb.photo" width="150">
        </template>
        <template v-else>
          <img src="../../assets/avatar.png" width="150">
        </template>
        <p class="title">{{celeb.name}}</p>
      </div>
    </section>

    <!-- content -->
    <div class="list">
      <List title="Movies" :items=celeb.movies.items :count=celeb.movies.count @fetch=fetchMovies></List>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
