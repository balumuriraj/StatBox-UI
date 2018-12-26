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
          <Chart class="item chart-block" :id="'ratingsChart'" :title="'Distribution'" :subtitle="'of ratings'" :numbers=movie.ratingBins></Chart>
          <Attributes class="item"></Attributes>
        </div>
        <div class="items-container">
          <CelebList v-if="crew" :title="'Crew'" :celebs="crew" class="item"></CelebList>
          <CelebList v-if="cast" :title="'Cast'" :celebs="cast" class="item"></CelebList>
        </div>
      </div>
    </section>
    <modal v-if="showModal" @close="showModal = false">
      <div slot="body" class="review-container">
        <div class="title-container">
          <img :src=movie.poster />
          <div class="title-section">
            <p class="title">{{movie.title}}</p>
            <p class="sub-title"> {{movie.releaseDate}} </p>
          </div>
        </div>
        <div class="rating-container">
          <div class="stars-container">
            <Rating :movieId=movie.id></Rating>
          </div>
        </div>
        <div class="ques-row">
          <div class="ques-section">
            <div class="ques">Watch with</div>
            <div class="options">
              <div class="option">
                <input v-model=watchWith name="watchWith" id="friends" type="radio" value="friends"/>
                <label for="friends">
                  <font-awesome-icon icon="user-friends" class="icon"></font-awesome-icon>
                  <p>friends</p>
                </label>
              </div>
              <div class="option">
                <input v-model=watchWith name="watchWith" id="family" type="radio" value="family"/>
                <label for="family">
                  <font-awesome-icon icon="users" class="icon"></font-awesome-icon>
                  <p>family</p>
                </label>
              </div>
            </div>
          </div>
          <div class="ques-section">
            <div class="ques">Movie Pace</div>
            <div class="options">
              <div class="option">
                <input v-model="pace" name="pace" id="slow" type="radio" value="slow"/>
                <label for="slow">
                  <font-awesome-icon icon="bicycle" class="icon"></font-awesome-icon>
                  <p>slow</p>
                </label>
              </div>
              <div class="option">
                <input v-model="pace" name="pace" id="fast" type="radio" value="fast"/>
                <label for="fast">
                  <font-awesome-icon icon="shipping-fast" class="icon"></font-awesome-icon>
                  <p>fast</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="ques-row">
          <div class="ques-section">
            <div class="ques">Movie plot</div>
            <div class="options">
              <div class="option">
                <input v-model="plot" name="plot" id="simple" type="radio" value="simple"/>
                <label for="simple">
                  <font-awesome-icon icon="forward" class="icon"></font-awesome-icon>
                  <p>simple</p>
                </label>
              </div>
              <div class="option">
                <input v-model="plot" name="plot" id="complex" type="radio" value="complex"/>
                <label for="complex">
                  <font-awesome-icon icon="network-wired" class="icon"></font-awesome-icon>
                  <p>complex</p>
                </label>
              </div>
            </div>
          </div>
          <div class="ques-section">
            <div class="ques">Movie theme</div>
            <div class="options">
              <div class="option">
                <input v-model="theme" name="theme" id="happy" type="radio" value="happy"/>
                <label for="happy">
                  <font-awesome-icon icon="smile" class="icon"></font-awesome-icon>
                  <p>happy</p>
                </label>
              </div>
              <div class="option">
                <input v-model="theme" name="theme" id="dark" type="radio" value="dark"/>
                <label for="dark">
                  <font-awesome-icon icon="skull" class="icon"></font-awesome-icon>
                  <p>dark</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="buttons-section">
          <button @click.prevent="submitReview">submit</button>
          <button @click.prevent="showModal = false">close</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

