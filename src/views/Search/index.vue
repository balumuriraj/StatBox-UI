<template>
  <div class="wrapper">
    <!-- content -->
    <div class="content">
      <template v-if=term>
        <div class="block">
          <p class="title">Movies for the search term <span>"{{ term }}"</span></p>
          <List v-if="movieHits.length" :items=movieHits :count=movieHits.length></List>
          <p v-else class="msg">No results found!</p>
        </div>

        <div class="block">
          <p class="title">Cast & Crew for the search term <span>"{{ term }}"</span></p>
          <List v-if="celebHits.length" :items=celebHits :count=celebHits.length></List>
          <p v-else class="msg">No results found!</p>
        </div> 
      </template>
      <p v-else class="msg">search for movies or celebs..</p>       
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
