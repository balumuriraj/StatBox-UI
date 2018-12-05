<template>
  <div class="container">
    <div class="section">
      <Chart class="item" :id="'ratingsChart'" :title="'Distribution'" :subtitle="'of ratings'"></Chart>
      <div class="numbers-container item">
        <div class="left-block">
          <div class="block">
            <div class="holder">
              <p class="number">112</p>
              <p class="name">Movie Hours</p>
            </div>
          </div>
          <div class="block">
            <div class="holder">
              <p class="number">3.5</p>
              <p class="name">Avg Rating</p>
            </div>
          </div>
        </div>
        <div class="right-block">
          <div class="block">
            <div class="holder">
              <p class="number">32</p>
              <p class="name">Movies Seen</p>
            </div>
          </div>
          <div class="block">
            <div class="holder">
              <p class="number">4</p>
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
      <Title :name="'Top Genres'" :subtitle="'for you'"></Title>
      <div class="word-cloud-container">
        <vue-word-cloud
          :words="[['romance', 1], ['horror', 2], ['fantasy', 7], ['adventure', 3], ['action', 8], ['sci-fi', 12], ['test', 0],]"
          :color="([, weight]) => weight > 10 ? 'rgb(217, 156, 209)' : weight > 5 ? 'rgb(201, 156, 209)' : 'rgb(185, 156, 209)'"
          font-family="Righteous"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>