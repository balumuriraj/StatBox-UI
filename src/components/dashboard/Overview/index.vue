<template>
  <div class="container">
    <div class="section">
      <Chart
        class="item"
        :id="'ratingsChart'"
        :type="'bar'"
        :title="'Ratings'"
        :subtitle="'count'"
        :numbers="ratingBins"
      ></Chart>
      <div class="numbers-container item">
        <div class="left-block">
          <div class="block">
            <div class="holder">
              <p class="number">{{ movieHours }}</p>
              <p class="name">Movie Hours</p>
            </div>
          </div>
          <div class="block">
            <div class="holder">
              <p class="number">{{ avgRating }}</p>
              <p class="name">Avg Rating</p>
            </div>
          </div>
        </div>
        <div class="right-block">
          <div class="block">
            <div class="holder">
              <p class="number">{{ moviesCount }}</p>
              <p class="name">Movies Seen</p>
            </div>
          </div>
          <div class="block">
            <div class="holder">
              <p class="number">{{ maxRating }}</p>
              <p class="name">Highest Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <CelebList :title="'Top Directors'" :subtitle="'for you'" :celebs="directors" class="item"></CelebList>
      <CelebList :title="'Top Actors'" :subtitle="'for you'" :celebs="actors" class="item"></CelebList>
    </div>
    <div class="genres-container">
      <Title :name="'Top Genres'" :subtitle="'watched by you'"></Title>
      <div class="word-cloud-container" v-if="genres && genres.length">
        <vue-word-cloud
          :words="genres"
          :color="([, weight]) => weight > 10 ? 'rgb(217, 156, 209)' : weight > 5 ? 'rgb(201, 156, 209)' : 'rgb(185, 156, 209)'"
          font-family="Righteous"
        />
      </div>
      <EmptyBox v-else></EmptyBox>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>