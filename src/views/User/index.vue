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
          <h1 class="title">{{ name }}</h1>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
        <div class="container">
          <div class="columns is-multiline is-centered">
            <div class="column is-half">
              <div class="box chart-box">
                <p>Rating Distribution</p>
                <div class ="ct-chart ct-golden-section"></div>
              </div>
            </div>
            <div class="column is-half">
              <div class="box">

              </div>
            </div>
          </div>
        </div>
    </section>
    
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss">
.chart-box {
  padding: 0;
}
</style>
