<template>
  <div class="home">
    <section class="hero is-danger is-medium">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">StatBox</h1>
          <!-- <h2 class="subtitle">find movies you want to watch</h2> -->
          <input type="text" class="search" placeholder="find movies you want to watch...">
        </div>
      </div>
    </section>

    <!-- <div class="hero-poster">
      <img src="../../assets/hero-bg.jpg"/>
    </div> -->

    <!-- content -->
    <section class="section">
        <div class="container">
          <List title="Latest"></List>
          <br>
          <List title="Coming Soon"></List>
          <br>
          <List title="Trending"></List>
        </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
