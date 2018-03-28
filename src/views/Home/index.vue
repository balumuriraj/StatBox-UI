<template>
  <div class="home">
    <section class="hero is-warning is-medium is-bold">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <Menu></Menu>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">StatBox</h1>
          <h2 class="subtitle">find movies you want to watch</h2>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
        <div class="container">
          <List></List>
        </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
