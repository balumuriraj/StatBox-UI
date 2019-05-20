<template>
  <div class="wrapper">
    <!-- content -->
    <div class="content">
      <template v-if=term>
        <div class="block" v-if="movieHits.length">
          <p class="title">Movies for the search term <span>"{{ term }}"</span></p>
          <List  :items=movieHits :count=movieHits.length></List>
        </div>

        <div class="block" v-if="celebHits.length">
          <p class="title">Cast & Crew for the search term <span>"{{ term }}"</span></p>
          <List :items=celebHits :count=celebHits.length></List>
        </div> 
        <div class="attribution">
          <img :src="require(`@/assets/logos/Algolia_Logo.svg`)">
        </div>
      </template>
      <p v-else class="placeholder">search for movies or celebs..</p>       
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
