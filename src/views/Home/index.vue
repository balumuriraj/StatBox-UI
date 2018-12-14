<template>
  <section class="content">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <p class="title">StatBox</p>
        <p>Telugu Movies Database</p>
      </div>
    </div>

    <!-- carousels -->
    <div class="carousels">
      <Carousel title="Latest" :movies=latest.items :count=latest.count @fetch=fetchLatest :link="'/explore/latest'"></Carousel>
      <br>
      <Carousel title="Coming Soon" :movies=upcoming.items :count=upcoming.count @fetch=fetchUpcoming :link="'/explore/upcoming'"></Carousel>
      <br>
      <Carousel title="2010-2015" :movies=from2010to2015.items :count=from2010to2015.count @fetch=fetchFrom2010to2015 :link="'/explore/years/2010-2015'"></Carousel>
    </div>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
