<template>
  <div class="content">
    <div class="hero">
      <img :src="movie.poster">
      <div class="overlay-gradient"></div>
    </div>

    <!-- content -->
    <section class="content-section">
      <div class="left-section">
        <Poster :imageUrl="movie.poster" :movieId="movie.id"></Poster>
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
          <Chart class="item chart-block" :id="'ratingsChart'" :title="'Distribution'" :subtitle="'of ratings'" :numbers=movie.ratings></Chart>
          <Attributes class="item"></Attributes>
        </div>
        <div class="items-container">
          <CelebList v-if="crew" :title="'Crew'" :celebs="crew" class="item"></CelebList>
          <CelebList v-if="cast" :title="'Cast'" :celebs="cast" class="item"></CelebList>
        </div>
      </div>
    </section>
    <modal v-if="showModal" @close="showModal = false">
      <div slot="body">
        <div class="ques-section">
          <div class="ques">Watch with?</div>
          <div class="options">
            <span>friends</span>
            <span>self</span>
            <span>family</span>
          </div>
        </div>
        <div class="ques-section">
          <div class="ques">Movie Pace?</div>
          <div class="options">
            <span>slow</span>
            <span>fast</span>
          </div>
        </div>
        <div class="ques-section">
          <div class="ques">Movie theme?</div>
          <div class="options">
            <span>simple</span>
            <span>complex</span>
          </div>
        </div>
        <div class="ques-section">
          <div class="ques">Movie plot?</div>
          <div class="options">
            <span>light</span>
            <span>dark</span>
          </div>
        </div>

        <div class="buttons-section">
          <button>submit</button>
          <button @click.prevent="showModal = false">cancel</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

