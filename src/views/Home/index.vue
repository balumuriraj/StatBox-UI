<template>
  <section class="content">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">TMDb</p>
        <p>Telugu Movies Database</p>
      </div>
    </div>

    <!-- carousels -->
    <div class="carousels">
      <Carousel title="Latest" :movies=latest.items :count=latest.count @fetch=fetchLatest></Carousel>
      <br>
      <Carousel title="Coming Soon" :movies=upcoming.items :count=upcoming.count @fetch=fetchUpcoming></Carousel>
      <br>
      <Carousel title="Trending" :movies=upcoming.items :count=upcoming.count @fetch=fetchUpcoming></Carousel>
    </div>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
