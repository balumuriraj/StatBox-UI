<template>
  <div class="poster-container">
    <img :src=imageUrl />
    <div class="stars-container">
      <Rating :movieId=movieId></Rating>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
