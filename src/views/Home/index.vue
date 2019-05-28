<template>
  <section class="content">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-body">
        <div class="title-container">
          <div class="title-block">
            <div class="title">
              statbox
              <span>- Telugu Movie Database</span>
            </div>
            <p
              class="sub-title"
            >Browse, search, rate, and stream Movies from Netflix, Prime Video and YouTube!</p>
            <a v-if="!isUserLoggedIn" @click="logIn" class="button">Get Started</a>
          </div>
        </div>
      </div>
    </div>

    <!-- carousels -->
    <div class="carousels">
      <!-- <Carousel title="Latest" :movies=latest.items :count=latest.count @fetch=fetchLatest :link="'/explore/latest'"></Carousel> -->
      <br>
      <!-- <Carousel title="Coming Soon" :movies=upcoming.items :count=upcoming.count @fetch=fetchUpcoming :link="'/explore/upcoming'"></Carousel>
      <br>-->
      <Carousel
        title="Popular"
        :movies="popular.items"
        :count="popular.count"
        @fetch="fetchPopular"
        :link="'/explore/popular'"
      ></Carousel>
      <br>
      <Carousel
        title="Top Rated"
        :movies="topRated.items"
        :count="topRated.count"
        @fetch="fetchTopRated"
        :link="'/explore/toprated'"
      ></Carousel>
      <br>
      <!-- <Carousel title="2010-2015" :movies=from2010to2015.items :count=from2010to2015.count @fetch=fetchFrom2010to2015 :link="'/explore/years/2010-2015'"></Carousel> -->
      <br>
      <div class="charts-container">
        <Chart
          class="chart-block bar"
          :id="'moviesCountChart'"
          :type="'bar'"
          :title="'Distribution'"
          :subtitle="'of movies over the years'"
          :numbers="moviesCountBins"
        ></Chart>
        <!-- <Chart
          class="chart-block pie"
          :id="'genresCountChart'"
          :type="'pie'"
          :title="'Distribution'"
          :subtitle="'of genres'"
          :numbers="moviesCountBins"
        ></Chart> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
