<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-white">
      <Title :name="'Distribution'" :subtitle="' of ratings'"></Title>
      <div class ="ct-chart ct-golden-section" id="distributionChart"></div>  
      <div class="level">
      <div class="level-item">
        <div class="stat-block">
          <span>3,456</span>
          <p>Views</p>
        </div>
      </div>
      <div class="level-item">
        <div class="stat-block">
          <span>832</span>
          <p>Watchlist</p>
        </div>
      </div>
      <div class="level-item">
        <div class="stat-block">
          <span>26</span>
          <p>Not Interested</p>
        </div>
      </div>
    </div>       
    </article>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
