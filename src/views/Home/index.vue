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
      <!-- <Carousel title="Coming Soon" :movies=upcoming.items :count=upcoming.count @fetch=fetchUpcoming :link="'/explore/upcoming'"></Carousel>
      <br> -->
      <Carousel
        title="New Movies"
        :movies="newMovies.items"
        :count="newMovies.count"
        @fetch="fetchNew"
        :link="'/browse'"
      ></Carousel>
      <br>
      <Carousel
        title="Popular Movies"
        :movies="popularMovies.items"
        :count="popularMovies.count"
        @fetch="fetchPopular"
        :link="'/browse?sort=popularity'"
      ></Carousel>
      <br>
      <Carousel
        title="Top Rated Movies"
        :movies="topRatedMovies.items"
        :count="topRatedMovies.count"
        @fetch="fetchTopRated"
        :link="'/browse?sort=rating'"
      ></Carousel>
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
