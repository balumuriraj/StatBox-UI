<template>
  <div class="celeb-wrapper">
    <section class="hero">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="img-container">
          <template v-if="celeb.photo">
            <img :src="celeb.photo" width="150">
          </template>
          <template v-else>
            <img src="../../assets/avatar.png" width="150">
          </template>
        </div>
        <div class="info">
          <p class="title">{{celeb.name}}</p>
          <p class="desc">{{celeb.dob}} {{ celeb.dob && `(${age} years)` || 'Age Not Available' }}</p>
        </div>
      </div>
    </section>

    <!-- content -->
    <div class="list">
      <List title="Movies" subtitle="since Jan 1, 2000" :items=movies.items :count=movies.count @fetch=fetchMovies></List>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
