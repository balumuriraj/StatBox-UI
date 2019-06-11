<template>
  <div>
    <div class="content" v-if="this">
      <div class="hero">
        <img :src="poster">
        <div class="overlay-gradient"></div>
      </div>

      <!-- content -->
      <section class="content-section">
        <div class="left-section">
          <Poster :movie="this"></Poster>
          <div class="info-container">
            <Info :movie="this"></Info>
          </div>
        </div>
        <div class="right-section">
          <div class="title-container">
            <Content :movie="this"></Content>
          </div>
          <div class="info-container">
            <Info :movie="this"></Info>
          </div>
          <div class="streamings-container">
            <div class="title-block">
              <p class="title">Watch Now</p>
              <div class="button">
                <font-awesome-icon icon="play" class="icon"></font-awesome-icon>
                <span>TRAILER</span>
              </div>
            </div>
            <div class="streams">
              <div class="stream" :class="{ 'active': streams && streams.netflix }">
                <span class="name netflix">NETFLIX</span>
                <span class="type">{{ streams && streams.netflix ? "Subscription" : "Unavailable" }}</span>
              </div>
              <div class="stream" :class="{ 'active': streams && streams.prime }">
                <span class="name prime">Prime Video</span>
                <span class="type">{{ streams && streams.prime ? "Subscription" : "Unavailable" }}</span>
              </div>
              <div class="stream" :class="{ 'active': streams && streams.youtube }">
                <span class="name youtube">YouTube</span>
                <span class="type">{{ streams && streams.youtube ? "Free" : "Unavailable" }}</span>
              </div>
            </div>
          </div>
          <div class="items-container">
            <Chart
              class="item chart-block"
              :id="'ratingsChart'"
              :type="'bar'"
              :title="'Ratings'"
              :subtitle="'count'"
              :numbers="ratingBins"
            ></Chart>
            <Attributes class="item" :props="attributes"></Attributes>
          </div>
          <div class="items-container">
            <CelebList :title="'Crew'" :celebs="crew" class="item"></CelebList>
            <CelebList :title="'Cast'" :celebs="cast" class="item"></CelebList>
          </div>
        </div>
      </section>
      <div class="similars-container">
        <Carousel
          title="Similar Movies"
          :movies="similarMovies.items"
          :count="similarMovies.count"
          @fetch="fetchSimilar"
          :link="'/browse'"
        ></Carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

