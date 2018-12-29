<template>
  <div>
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">{{item.name}} Movies</p>
      </div>
    </div>
    
    <div class="list">
      <List :title=null :items=movies.items :count=movies.count @fetch=fetchMovies></List>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>