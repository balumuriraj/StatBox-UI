<template>
  <div class="movie-wrapper">
    <section class="hero is-dark is-medium">
      <div class="movie-background">
        <img :src="movie.poster" />
        <div class="overlay-gradient"></div>
      </div>
      
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-narrow has-text-centered">
              <Poster :imageUrl=movie.poster :movieId=movie.id></Poster>
            </div>
            <div class="column is-half">
              <Content :movie=movie></Content>      
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
            <div class="main-container">
              <div class="tile is-ancestor">
                <div class="tile is-vertical">
                  <div class="tile is-hidden-touch">
                    <Stats></Stats>
                    <Attributes></Attributes>
                  </div>
                  <div class="tile is-vertical is-hidden-desktop">
                    <Stats></Stats>
                    <Attributes></Attributes>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-white">
                      <Title name="Movies" subtitle=" released this month"></Title>
                      <Table :headers="['Title','Release Date','Certification','Runtime']" :rows=movies></Table>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column side-container is-narrow">
            <CelebsList :title="'Crew'" :celebs=crew></CelebsList>
            <CelebsList :title="'Cast'" :celebs=cast></CelebsList>
          </div>
        </div>
        
        <Carousel title="Similars" :movies="movie.moviesThisMonth"></Carousel> 
      </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

