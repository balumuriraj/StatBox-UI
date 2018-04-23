<template>
  <div class="home">
    <section class="hero is-dark is-medium">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <img :src="user.photoURL" width="100">
          <h1 class="title">{{user.displayName}}</h1>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
        <div class="container">
          <pre>{{user}}</pre>
        </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>  
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
