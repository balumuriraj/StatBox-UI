<template>
  <div>
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">{{id}} Movies</p>
      </div>
    </div>
    
    <div class="list" v-if="id === 'recent' && recent">
      <List :title=null :items=recent.items :count=recent.count @fetch=fetchMovies></List>
    </div>

    <div class="list" v-if="id === '2010-2015' && from2010to2015">
      <List :title=null :items=from2010to2015.items :count=from2010to2015.count @fetch=fetchMovies></List>
    </div>

    <div class="list" v-if="id === '2000-2010' && from2000to2010">
      <List :title=null :items=from2000to2010.items :count=from2000to2010.count @fetch=fetchMovies></List>
    </div>

    <div class="list" v-if="id === '1990-2000' && from1990to2000">
      <List :title=null :items=from1990to2000.items :count=from1990to2000.count @fetch=fetchMovies></List>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>