<template>
  <div>
    <div class="content" v-if="movie">
      <div class="hero">
        <img :src="movie.poster">
        <div class="overlay-gradient"></div>
      </div>

      <!-- content -->
      <section class="content-section">
        <div class="left-section">
          <Poster :movie="movie"></Poster>
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
          <div class="streamings-container">
            <div class="title-block">
              <p class="title">Watch Now</p>
              <div class="button">
                <font-awesome-icon icon="play" class="icon"></font-awesome-icon>
                <span>Trailer</span>
              </div>
            </div>
            <div class="streams">
              <div class="stream" :class="{ 'active': movie.url }">
                <span class="name netflix">NETFLIX</span>
                <span class="type">{{ movie.url ? "Subscription" : "Unavailable" }}</span>
              </div>
              <div class="stream" :class="{ 'active': movie.url }">
                <span class="name prime">Prime Video</span>
                <span class="type">{{ movie.url ? "Subscription" : "Unavailable" }}</span>
              </div>
              <div class="stream" :class="{ 'active': movie.url }">
                <span class="name youtube">YouTube</span>
                <span class="type">{{ movie.url ? "Free" : "Unavailable" }}</span>
              </div>
            </div>
          </div>
          <div class="items-container">
            <Chart
              class="item chart-block"
              :id="'ratingsChart'"
              :title="'Distribution'"
              :subtitle="'of ratings'"
              :numbers="movie.ratingBins"
            ></Chart>
            <Attributes class="item" :props="attributes"></Attributes>
          </div>
          <div class="items-container">
            <CelebList v-if="movie.crew" :title="'Crew'" :celebs="movie.crew" class="item"></CelebList>
            <CelebList v-if="movie.cast" :title="'Cast'" :celebs="movie.cast" class="item"></CelebList>
          </div>
        </div>
      </section>
    </div>
    <div class="loading">
      <font-awesome-icon v-show="loading" icon="spinner" class="icon" spin/>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

