<template>
  <div class="content">
    <div class="hero">
      <img :src="movie.poster">
      <div class="overlay-gradient"></div>
    </div>

    <!-- content -->
    <section class="content-section">
      <div class="left-section">
        <Poster :movie=movie></Poster>
        <div class="info-container">
          <Info :movie="movie"></Info>
        </div>
      </div>
      <div class="right-section">
        <div class="title-container">
          <Content :movie="movie" @show="showModal = true"></Content>
        </div>
        <div class="info-container">
          <Info :movie="movie"></Info>
        </div>
        <div class="items-container">
          <Chart class="item chart-block" :id="'ratingsChart'" :title="'Distribution'" :subtitle="'of ratings'" :numbers=movie.ratingBins></Chart>
          <Attributes class="item" :props=attributes></Attributes>
        </div>
        <div class="items-container">
          <CelebList v-if="crew" :title="'Crew'" :celebs="crew" class="item"></CelebList>
          <CelebList v-if="cast" :title="'Cast'" :celebs="cast" class="item"></CelebList>
        </div>
      </div>
    </section>
    <ReviewModal v-if="showModal" :movie=movie @close="showModal = false"></ReviewModal>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

