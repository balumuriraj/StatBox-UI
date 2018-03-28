<template>
  <div class="movie-wrapper">
    <section class="hero is-dark is-medium">
      <div class="movie-background">
        <img :src="movie.poster" />
        <div class="overlay-gradient"></div>
      </div>
      
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar container" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <router-link class="back-button" to="/">
              <i class="fas fa-caret-left"></i> Back
            </router-link>
          </div>
        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-narrow has-text-centered">
              <img :src="movie.poster" />
              <div class="stars-container">
                  <div class="stars"></div>
              </div>
            </div>
            <div class="column is-half">
              <h1 class="title">{{ movie.title }}</h1>
              <ul class="genre-list">
                <li v-for="(genre, index) in movie.genre" :key='index'>
                  <router-link to="/">{{ genre }}</router-link>
                </li>
              </ul>
              <p class="description">{{ description }}</p>
              <div class="info">
                <div class="cert">{{ cert }}</div>
                <div><i class="fas fa-calendar-alt"></i> {{ movie.date }}</div>
                <div><i class="fas fa-clock"></i> {{ movie.runtime }} mins</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column">
              <div class="columns main-container">
                <div class="column chart-container">
                  <div class ="ct-chart ct-golden-section"></div>
                </div>
                <div class="column">
                  
                </div>
              </div>
            </div>
            <div class="column is-narrow">
              <CelebsList :title="'Crew'" :celebs=crew></CelebsList>
              <CelebsList :title="'Cast'" :celebs=cast></CelebsList>
            </div>
          </div>
        </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

