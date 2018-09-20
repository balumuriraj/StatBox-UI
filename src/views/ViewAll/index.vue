<template>
  <div class="home">
    <section class="hero is-danger is-small">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1>{{count}} Titles</h1>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
      <div class="container">
        <MovieList :movies=movies :count=count></MovieList>
      </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
