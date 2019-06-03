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
      <!-- <Carousel title="Latest" :movies=latest.items :count=latest.count @fetch=fetchLatest :link="'/explore/latest'"></Carousel>
      <br>
      <Carousel title="Coming Soon" :movies=upcoming.items :count=upcoming.count @fetch=fetchUpcoming :link="'/explore/upcoming'"></Carousel>
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
        title="2010's Movies"
        :movies="from2010to2019Movies.items"
        :count="from2010to2019Movies.count"
        @fetch="fetch2010s"
        :link="'/browse?year=2010&year=2011&year=2012&year=2013&year=2014&year=2015&year=2016&year=2017&year=2018&year=2019&sort=releasedate'"
      ></Carousel>
      <br>
      <!-- <Carousel
        title="2000's Movies"
        :movies="from2000to2009Movies.items"
        :count="from2000to2009Movies.count"
        @fetch="fetch2000s"
        :link="'/browse?year=2000&year=2001&year=2002&year=2003&year=2004&year=2005&year=2006&year=2007&year=2008&year=2009&sort=releasedate'"
      ></Carousel>
      <br> -->
      <Carousel
        title="Top Rated Movies"
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
